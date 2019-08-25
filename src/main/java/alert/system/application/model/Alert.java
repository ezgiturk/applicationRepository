package alert.system.application.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.URL;
import org.springframework.http.HttpMethod;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.util.Set;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "alerts")
public class Alert {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    private String name;

    @URL
    private String url;
    private HttpMethod http_method;
    private int period;

    @JoinColumn(name = "alert_id")
    @OneToMany(fetch = FetchType.EAGER, cascade = {CascadeType.ALL} )
    @Nullable
    private Set<Result> resultList ;

    @Override
    public String toString() {
        return "Alert [id=" + id + "http_method=" + http_method + "period=" + period + ", url=" + url + "]";
    }
}
