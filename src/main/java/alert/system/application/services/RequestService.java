package alert.system.application.services;
import alert.system.application.model.Alert;
import alert.system.application.repository.AlertRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class RequestService {

    private final RestTemplate restTemplate;

    @Async
    public boolean sendRequest(Alert alert){

        try {
            System.out.println(alert.getHttp_method());
            System.out.println(alert.getUrl());
            ResponseEntity<String> responseEntity = restTemplate.exchange(
                    alert.getUrl(),
                    alert.getHttp_method(),
                    null,
                    String.class
            );

            if (responseEntity.getStatusCode() == HttpStatus.OK) {
                //System.out.println("response received");
                //System.out.println(responseEntity.getBody());
                return true;
            } else {
                //System.out.println("error occurred");
                //System.out.println(responseEntity.getStatusCode());
                return false;
            }
        }
        catch (Exception e){
            //System.out.println("CATCH");
            //e.printStackTrace();
            return false;
        }
    }
}
