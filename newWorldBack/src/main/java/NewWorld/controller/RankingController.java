package NewWorld.controller;

import NewWorld.domain.User;
import NewWorld.dto.UserDto;
import NewWorld.service.RankingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class RankingController {
    private final RankingService rankingService;

    @GetMapping("/getAttendanceRanking")
    public ResponseEntity<List<UserDto>> getAttendanceLank() {
        List<UserDto> allPost = rankingService.getAttendanceRanking();
        return ResponseEntity.ok().body(allPost);
    }

    @GetMapping("/getScoreRanking")
    public ResponseEntity<List<UserDto>> getScoreLank() {
        List<UserDto> allPost = rankingService.getScoreRanking();
        return ResponseEntity.ok().body(allPost);
    }

    @GetMapping("/getTotalRanking")
    public ResponseEntity<List<UserDto>> getTotalLank() {
        List<UserDto> allPost = rankingService.getTotalRanking();
        return ResponseEntity.ok().body(allPost);
    }
}
