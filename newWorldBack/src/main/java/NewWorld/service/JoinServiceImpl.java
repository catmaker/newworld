package NewWorld.service;

import NewWorld.exception.JoinException;
import NewWorld.repository.UserRepository;
import NewWorld.vo.UserVo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * 2024.01.14 jeonil
 * 로그인 처리
 */
@Service
@RequiredArgsConstructor
public class JoinServiceImpl implements JoinService {

    private final UserRepository userRepository;

    /**
     * 회원가입
     * @param userVo
     * @throws JoinException
     */
    @Override
    public void join(UserVo userVo) throws JoinException {
        try{
            userRepository.save(userVo);
        }catch (Exception e){
            throw new JoinException("회원가입에 실패하였습니다.");
        }
    }

    /**
     * 회원탈퇴
     * @param userInfo
     * @throws JoinException
     */
    public void withdraw(String userInfo){
        
    }
}
