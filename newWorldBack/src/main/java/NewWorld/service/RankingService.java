package NewWorld.service;

import NewWorld.domain.User;
import NewWorld.dto.UserDto;

import java.util.List;

public interface RankingService {
    List<UserDto> getAttendanceRanking();

    List<UserDto> getScoreRanking();

    List<UserDto> getTotalRanking();
}
