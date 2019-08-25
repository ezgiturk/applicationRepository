package alert.system.application.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@ToString
@Table(name = "results")
public class Result {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
    private Boolean success;
    private Date date;

    public Result() {

    }

}
