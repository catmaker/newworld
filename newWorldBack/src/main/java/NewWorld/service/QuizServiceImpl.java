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
public class QuizServiceImpl implements QuizService {

    private final QuizRepository quizRepository;
    private final UserRepository userRepository;
    private final UserQuizSolvedDateRepository userQuizSolvedDateRepository;

    /**
     * 전체 퀴즈 불러오기
     *
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
     *
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
     *
     * @param quizDto
     * @return
     */
    @Override
    public QuizDto quizMake(QuizDto quizDto) throws CustomError {
        List<HintDto> hints = quizDto.getHints();
        List<Hint> savedHints = new ArrayList<>();

        Quiz sameQuiz = quizRepository.findByTitleAndAndMaker(quizDto.getQuizTitle(), quizDto.getMaker())
                .orElse(null);

        if (quizDto.getQuizTitle() == null || quizDto.getQuizDetail() == null) {
            throw new CustomError(ErrorCode.EMPTY_INFO);
        } else if (sameQuiz != null) {
            throw new CustomError(ErrorCode.DUPICATION_INFO);
        }

        if (hints != null) {
            hints.stream().forEach(s -> {
                savedHints.add(Hint.of(s));
            });
        }

        Quiz quiz = Quiz.of(quizDto, savedHints);
        Quiz savedQuiz = quizRepository.save(quiz);

        return QuizDto.of(savedQuiz);
    }

    /**
     * 퀴즈삭제
     *
     * @param quizDto
     * @return
     */
    @Override
    public void deleteQuiz(QuizDto quizDto) throws CustomError {

        Quiz quiz = quizRepository.findById(quizDto.getQuizId())
                .orElseThrow(() -> new CustomError(ErrorCode.NOT_FOUND));

        if(!quizDto.getNickname().equals(quiz.getMaker())){
            return;
        }
        
        userQuizSolvedDateRepository.deleteAllByQuiz(quiz);
        quizRepository.deleteById(quiz.getId());
    }

    /**
     * 퀴즈업데이트
     *
     * @param quizDto
     */
    @Override
    public QuizDto updateQuiz(QuizDto quizDto) throws CustomError {
        Quiz quiz = quizRepository.findById(quizDto.getQuizId())
                .orElseThrow(() -> new CustomError(ErrorCode.NOT_FOUND));

        Quiz updatedQuiz = quiz.updateQuiz(quizDto);

        List<Hint> hintList = quiz.getHintList();
        List<HintDto> hints = quizDto.getHints();

        if (hintList == null) {
            quiz.deleteAllHint(quiz.getHintList());
        } else {
            hintList.stream().forEach(s -> quiz.addHint(s));
            quiz.deleteHint(hints.stream().map(s -> Hint.of(s)).collect(Collectors.toList()));
        }

        return QuizDto.of(updatedQuiz);
    }

    /**
     * 정답확인
     *
     * @param quizDto
     * @return
     */
    @Override
    public String checkAnswer(QuizDto quizDto) throws CustomError {
        Quiz quiz = quizRepository.findById(quizDto.getQuizId())
                .orElseThrow(() -> new CustomError(ErrorCode.NOT_FOUND));

        String collectAnswer = quiz.getAnswer();

        if (collectAnswer.equals(quizDto.getAnswer())) {
            User user = userRepository.findByNickname(quizDto.getNickname())
                    .orElseThrow(() -> new CustomError(ErrorCode.USER_NOT_FOUND));
            UserQuizSolvedDate solvedDate = UserQuizSolvedDate.of(quiz, user);
            user.addPoint();

            userQuizSolvedDateRepository.save(solvedDate);
            return "success";
        }
        return "wrong answer";
    }
}
