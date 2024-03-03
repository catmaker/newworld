package NewWorld.service;

import NewWorld.domain.Post;
import NewWorld.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface LankService {
    List<User> getAttendanceLank();

    List<User> getScoreLank();

    List<User> getTotalLank();
}
