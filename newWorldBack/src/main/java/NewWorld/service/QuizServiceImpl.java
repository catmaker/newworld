package NewWorld.service;

import NewWorld.MemberType;
import NewWorld.QuizDifficulty;
import NewWorld.domain.Hint;
import NewWorld.domain.Quiz;
import NewWorld.domain.User;
import NewWorld.domain.UserQuizSolvedDate;
import NewWorld.dto.QuizDto;
import NewWorld.repository.HintRepository;
import NewWorld.repository.QuizRepository;
import NewWorld.repository.UserQuizSolvedDateRepository;
import NewWorld.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class QuizServiceImpl implements QuizService{

    private final HintRepository hintRepository;
    private final QuizRepository quizRepository;
    private final UserRepository userRepository;
    private final UserQuizSolvedDateRepository userQuizSolvedDateRepository;
    @Override
    public Page<Quiz> getQuizzes(Pageable pageable) {

        Page<Quiz> all = quizRepository.findAll(pageable);
        List<Quiz> all1 = quizRepository.findAll();

        return all;
    }
    @Override
    public QuizDto getQuiz(String quizTitle, String maker) {
        Quiz quiz = quizRepository.findByTitleAndAndMaker(quizTitle, maker);
        QuizDto quizDto = quiz.of(quiz);

        return quizDto;
    }

    @Override
    public String quizMake(QuizDto quizDto, String nickname) {
        List<String> hints = quizDto.getHints();
        List<Hint> savedHints = new ArrayList<>();
        Quiz checkValidation = quizRepository.findByTitleAndAndMaker(quizDto.getQuizTitle(), quizDto.getMaker());
        QuizDifficulty difficulty = QuizDifficulty.NORMAL;
        if(quizDto.getQuizTitle() == null){
            return "nonTitle";
        }
        if(quizDto.getQuizDetail() == null){
            return "nonDetail";
        }
        if(checkValidation != null){
            return "duplication";
        }

        if(hints != null){
            for(String hint : hints){
                Hint quizHint = Hint.builder()
                        .hint(hint)
                        .memberType(MemberType.USER)
                        .build();

                Hint save = hintRepository.save(quizHint);
                savedHints.add(save);
            }
        }

        if(quizDto.getQuizDifficulty() != null){
            difficulty = quizDto.getQuizDifficulty();
        }
        Quiz newQuiz = Quiz.builder()
                .title(quizDto.getQuizTitle())
                .detail(quizDto.getQuizDetail())
                .hintList(savedHints)
                .answer(quizDto.getAnswer())
                .maker(nickname)
                .quizDifficulty(difficulty)
                .build();

        Quiz savedQuiz = quizRepository.save(newQuiz);

        QuizDto result = savedQuiz.of(savedQuiz);

        if(result != null){
            return "s";
        }
         return "f";
    }

    @Override
    public void deleteQuiz(QuizDto quizDto, String quiz) {
        String quizTitle = quizDto.getQuizTitle();
        String maker = quizDto.getMaker();

        Quiz q = quizRepository.findByTitleAndAndMaker(quizTitle, maker);

        quizRepository.delete(q);
    }

    @Override
    public void updateQuiz(QuizDto quizDto){
        Optional<Quiz> optionalQuiz = quizRepository.findById(quizDto.getQuizId());

        if(optionalQuiz.isPresent()){
            Quiz quiz = optionalQuiz.get();
            quiz.updateQuiz(quizDto);

            List<Hint> hintList = quiz.getHintList();
            List<String> updateHints = quizDto.getHints();

            for(Hint hint: hintList){
                String hintDetail = hint.getHint();
                for(String updateHint: updateHints){
                    if(updateHint == null){
                        hintRepository.delete(hint);
                    }else if(hintDetail == hint.getHint()){
                        continue;
                    }
                    else{
                        hint.changeHint(updateHint);
                    }
                }
            }
        }

    }

    @Override
    public String checkAnswer(QuizDto quizDto) {
        Optional<Quiz> optionalQuiz = quizRepository.findById(quizDto.getQuizId());

        if(optionalQuiz.isPresent()){
            Quiz quiz = optionalQuiz.get();
            String collectAnswer = quiz.getAnswer();

            if(collectAnswer.equals(quizDto.getAnswer())){
                User user = userRepository.findByNickname(quizDto.getNickname());
                UserQuizSolvedDate solvedDate = UserQuizSolvedDate.builder()
                        .quiz(quiz)
                        .solvedTime(LocalDateTime.now().toLocalDate().toString())
                        .build();

                UserQuizSolvedDate savedSolvedUser = userQuizSolvedDateRepository.save(solvedDate);
                user.addSovlvedUser(savedSolvedUser);

                return "s";
            }else if(!collectAnswer.equals(quizDto.getAnswer())){
                return "wrong answer";
            }
        }
        return "f";
    }
}
