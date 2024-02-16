package NewWorld.service;

import NewWorld.MemberType;
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

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class QuizServiceImpl implements QuizService{

    private final HintRepository hintRepository;
    private final QuizRepository quizRepository;

    @Override
    public Page<Quiz> getQuizzes(Pageable pageable) {
        PageRequest pageRequest = getPageRequest(pageable);
        Page<Quiz> all = quizRepository.findAll(pageable);


        return all;
    }
    @Override
    public QuizDto getQuiz(String quizTitle, String maker) {
        Quiz quiz = quizRepository.findByTitleAndAndMaker(quizTitle, maker);
        QuizDto quizDto = quiz.of(quiz);

        return quizDto;
    }

    @Override
    public QuizDto quizMake(QuizDto quizDto, String quiz) {
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
                .maker(quizDto.getMaker())
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
    private static PageRequest getPageRequest(Pageable pageable) {
        int page = pageable.getPageNumber() == 0 ? 0 : pageable.getPageNumber() - 1;
        PageRequest pageRequest = PageRequest.of(page, 10);
        return pageRequest;
    }
}
