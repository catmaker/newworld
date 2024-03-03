package NewWorld.service;

import NewWorld.domain.Hint;
import NewWorld.domain.Quiz;
import NewWorld.domain.User;
import NewWorld.domain.UserQuizSolvedDate;
import NewWorld.dto.HintDto;
import NewWorld.dto.QuizDto;
import NewWorld.exception.CustomError;
import NewWorld.exception.ErrorCode;
import NewWorld.repository.QuizRepository;
import NewWorld.repository.UserQuizSolvedDateRepository;
import NewWorld.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class QuizServiceImpl implements QuizService{

    private final QuizRepository quizRepository;
    private final UserRepository userRepository;
    private final UserQuizSolvedDateRepository userQuizSolvedDateRepository;

    /**
     * 전체 퀴즈 불러오기
     * @param pageable
     * @return
     */
    @Override
    public Page<Quiz> getQuizzes(Pageable pageable) {
        Page<Quiz> all = quizRepository.findAll(pageable);
        return all;
    }

    /**
     * 퀴즈불러오기 (단일)
     * @param quizDto
     * @return
     */
    @Override
    public QuizDto getQuiz(QuizDto quizDto) {
        Quiz quiz = quizRepository.findById(quizDto.getQuizId()).
                orElseGet(null);
        QuizDto result = QuizDto.of(quiz);
        return result;
    }

    /**
     * 퀴즈생성
     * @param quizDto
     * @param nickname
     * @return
     */
    @Override
    public String quizMake(QuizDto quizDto, String nickname) {
        List<HintDto> hints = quizDto.getHints();
        List<Hint> savedHints = new ArrayList<>();

        Quiz sameQuiz = quizRepository.findByTitleAndAndMaker(quizDto.getQuizTitle(), quizDto.getMaker());

        if(hints != null){
            hints.stream().forEach(s->{savedHints.add(Hint.of(s));});
        }

        if(quizDto.getQuizTitle() == null){
            return "nonTitle";
        }
        if(quizDto.getQuizDetail() == null){
            return "nonDetail";
        }
        if(sameQuiz != null){
            return "duplication";
        }

        Quiz quiz = Quiz.of(quizDto,savedHints);
        Quiz savedQuiz = quizRepository.save(quiz);

        QuizDto result = QuizDto.of(savedQuiz);

        if(result != null){
            return "s";
        }
         return "f";
    }

    /**
     * 퀴즈삭제
     * @param quizDto
     * @return
     */
    @Override
    public String deleteQuiz(QuizDto quizDto) {
        String quizTitle = quizDto.getQuizTitle();
        String maker = quizDto.getMaker();

        if(quizDto.getNickname() != quizDto.getMaker()){
            return "f";
        }
        Quiz q = quizRepository.findByTitleAndAndMaker(quizTitle, maker);

        UserQuizSolvedDate byDate = userQuizSolvedDateRepository.findByQuiz(q);

        userQuizSolvedDateRepository.delete(byDate);
        quizRepository.delete(q);
        return "s";
    }

    /**
     * 퀴즈업데이트
     * @param quizDto
     */
    @Override
    public void updateQuiz(QuizDto quizDto){
        Optional<Quiz> optionalQuiz = quizRepository.findById(quizDto.getQuizId());

        if(optionalQuiz.isPresent()){
            Quiz quiz = optionalQuiz.get();
            quiz.updateQuiz(quizDto);

            List<Hint> hintList = quiz.getHintList();
            List<HintDto> hints = quizDto.getHints();

            if(hintList == null){
                quiz.deleteAllHint(quiz.getHintList());
            }else{
                hintList.stream().forEach(s -> quiz.addHint(s));
                quiz.deleteHint(hints.stream().map(s->Hint.of(s)).collect(Collectors.toList()));
            }

        }

    }

    /**
     *  정답확인
     * @param quizDto
     * @return
     */
    @Override
    public String checkAnswer(QuizDto quizDto) throws CustomError {
        Optional<Quiz> optionalQuiz = quizRepository.findById(quizDto.getQuizId());

        if(optionalQuiz.isPresent()){
            Quiz quiz = optionalQuiz.get();
            String collectAnswer = quiz.getAnswer();

            if(collectAnswer.equals(quizDto.getAnswer())){
                User user = userRepository.findByNickname(quizDto.getNickname())
                        .orElseThrow(()->new CustomError(ErrorCode.USER_NOT_FOUND));
                UserQuizSolvedDate solvedDate = UserQuizSolvedDate.of(quiz);
                user.addPoint();

                user.addSolvedQuiz(solvedDate);
                return "s";
            }else if(!collectAnswer.equals(quizDto.getAnswer())){
                return "wrong answer";
            }
        }
        return "f";
    }
}
