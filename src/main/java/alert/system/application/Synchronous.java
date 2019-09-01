package alert.system.application;

import alert.system.application.model.Alert;
import alert.system.application.services.AlertService;
import alert.system.application.services.RequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class Synchronous {
    private static int period=0;
    private static AlertService alertService;
    private static RequestService requestService;

    @Autowired
    public Synchronous(AlertService alertService, RequestService requestService) {
        Synchronous.requestService = requestService;
        Synchronous.alertService = alertService;
    }

    //@Scheduled(fixedRate = 1000)
    public void SyncMethod(){
        period+=1000;

        List<Alert> alertList = alertService.allAlerts();

        for(Alert alert: alertList){
            if(period % (alert.getPeriod()*1000) == 0){
                if(period>=(alert.getPeriod()*1000)){

                    boolean success = requestService.sendRequest(alert);
                    System.out.println("sonuc: "+success);
                    alertService.addResult(alert.getId(), success);
                    System.out.println("İSTEK GELDİ" + " period: "+ alert.getPeriod() +"  system period : "+period);
                }

            }
            else{
                System.out.println("değil : "+ alert.getPeriod());
            }
        }
    }
}
