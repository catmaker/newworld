package NewWorld.service;

import NewWorld.MemberType;
import NewWorld.QuizDifficulty;
import NewWorld.domain.Hint;
import NewWorld.domain.Quiz;
import NewWorld.dto.QuizDto;
import NewWorld.repository.HintRepository;
import NewWorld.repository.QuizRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class QuizServiceImpl implements QuizService{

    private final HintRepository hintRepository;
    private final QuizRepository quizRepository;

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
    public QuizDto quizMake(QuizDto quizDto, String nickname) {
        List<String> hints = quizDto.getHints();
        List<Hint> savedHints = new ArrayList<>();

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

        Quiz newQuiz = Quiz.builder()
                .title(quizDto.getQuizTitle())
                .detail(quizDto.getQuizDetail())
                .hintList(savedHints)
                .answer(quizDto.getAnswer())
                .maker(nickname)
                .quizDifficulty(quizDto.getQuizDifficulty())
                .build();

        Quiz savedQuiz = quizRepository.save(newQuiz);

        QuizDto result = savedQuiz.of(savedQuiz);

        return result;
    }

    @Override
    public void deleteQuiz(QuizDto quizDto, String quiz) {

    }

    @Override
    public void updateQuiz(QuizDto quizDto, String quiz) {

    }

    @Override
    public String checkAnswer(QuizDto quizDto, String answer) {
        return null;
    }


    /**
     * 게사판 pageable
     * @param pageable
     * @return
     */
    private PageRequest getPageRequest(Pageable pageable) {

        int page = pageable.getPageNumber() == 0 ? 0 : pageable.getPageNumber() - 1;
        PageRequest pageRequest = PageRequest.of(page, 10);
        return pageRequest;
    }
}
