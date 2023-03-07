package com.ssafy.bbkk.db.entity;

import lombok.*;
import javax.persistence.*;

@Entity
@Table(name="interest")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Interest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

}
