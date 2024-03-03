package NewWorld.dto;

import NewWorld.MemberType;
import NewWorld.domain.Hint;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class HintDto {

    private Long hintId;

    private String hint;

    private MemberType memberType;

    @Builder
    public HintDto(Long hintId, String hint, MemberType memberType) {
        this.hintId = hintId;
        this.hint = hint;
        this.memberType = memberType;
    }

    public static HintDto of(Hint hint){
        return HintDto.builder()
                .hintId(hint.getId())
                .hint(hint.getHint())
                .build();
    }
}
