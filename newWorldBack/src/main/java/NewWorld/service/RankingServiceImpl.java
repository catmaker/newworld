package NewWorld.service;

import NewWorld.domain.User;
import NewWorld.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RankingServiceImpl implements RankingService{

    private final UserRepository userRepository;

    @Override
    public List<User> getAttendanceRanking() {
        return userRepository.findTop100ByOrderByAttendanceAsc().orElseThrow(null);
    }
    @Override
    public List<User> getScoreRanking() {
        return userRepository.findTop100ByOrderByPointAsc().orElseThrow(null);
    }

    @Override
    public List<User> getTotalRanking() {
        return userRepository.findTop100ByOrderByAttendanceAscPointAsc().orElseThrow(null);
    }
}
