package com.sarang.sarangback.dto.object;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CommnetListItem {
    private String nickname;
    private String profileImage;
    private String writeDatetime;
    private String content;

}
