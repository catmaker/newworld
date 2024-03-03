package NewWorld.controller;

import NewWorld.domain.Post;
import NewWorld.domain.User;
import NewWorld.service.LankService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class LankController {
    private final LankService lankService;

    @GetMapping("/getAttendanceLank")
    public ResponseEntity<List<User>> getAttendanceLank() {

        List<User> allPost = lankService.getAttendanceLank();

        return ResponseEntity.ok().body(allPost);
    }

    @GetMapping("/getScoreLank")
    public ResponseEntity<List<User>> getScoreLank() {
        List<User> allPost = lankService.getScoreLank();

        return ResponseEntity.ok().body(allPost);
    }

    @GetMapping("/getTotalLank")
    public ResponseEntity<List<User>> getTotalLank() {

        List<User> allPost = lankService.getTotalLank();

        return ResponseEntity.ok().body(allPost);
    }
}
