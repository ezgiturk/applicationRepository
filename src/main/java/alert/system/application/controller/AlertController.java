package alert.system.application.controller;

import alert.system.application.model.Alert;
import alert.system.application.repository.AlertRepository;
import alert.system.application.services.AlertService;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@EnableScheduling
@RestController
@Transactional
@CrossOrigin("*")
public class AlertController {
    private final AlertService alertService;

    public AlertController(AlertService alertService) {
        this.alertService = alertService;
    }

    @GetMapping("/alerts/{id}")
    public Optional<Alert> getAlert(@PathVariable Long id) {
        return alertService.getAlert(id);
    }

    @PostMapping("/add-alert")
    public Alert addAlert(@RequestBody final Alert alert){
        alert.setResultList(new HashSet<>());
        return alertService.addAlert(alert);
    }
    /*
    @Scheduled(fixedRate = 5000)
    public void task1() {
        System.out.println(Thread.currentThread().getName()+" Task 1 executed at "+ new Date());
    }
    @Scheduled(fixedRate = 1000)
    public void task2() {
        System.out.println(Thread.currentThread().getName() + " Task 2 executed at " + new Date());
    }*/

    @GetMapping("/alerts")
    public List alertList(){
        return alertService.allAlerts();

    }
    @DeleteMapping("/alert/{alertId}")
    public void deleteAlert(@PathVariable Long alertId){
        alertService.deleteAlert(alertId);
    }

    public Alert updateAlert(Alert alert, Long alertId){
        Optional<Alert> updatedAlert = alertService.findById(alertId);

        if (updatedAlert.isPresent()){
            alert.setId(updatedAlert.get().getId());
            return alertService.save(alert);

        }
        return null;
    }
}
