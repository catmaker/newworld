package NewWorld.service;

import NewWorld.domain.User;
import NewWorld.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LankServiceImpl implements LankService{

    private final UserRepository userRepository;

    @Override
    public List<User> getAttendanceLank() {
        return userRepository.findTop100ByOrderByAttendanceAsc().orElseThrow(null);
    }
    @Override
    public List<User> getScoreLank() {
        return userRepository.findTop100ByOrderByPointAsc().orElseThrow(null);
    }

    @Override
    public List<User> getTotalLank() {
        return userRepository.findTop100ByOrderByAttendanceAscPointAsc().orElseThrow(null);
    }
}
