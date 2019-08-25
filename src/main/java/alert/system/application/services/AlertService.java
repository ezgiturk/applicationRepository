package alert.system.application.services;

import alert.system.application.model.Alert;
import alert.system.application.model.Result;
import alert.system.application.repository.AlertRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
public class AlertService {
    private AlertRepository alertRepository;

    public AlertService(AlertRepository alertRepository) {
        this.alertRepository = alertRepository;
    }


    public Alert addAlert(Alert alert) {
        alert.setResultList(new HashSet<>());
        return alertRepository.save(alert);
    }

    public Optional<Alert> getAlert(Long id) {
        return alertRepository.findById(id);
    }

    public List<Alert> allAlerts(){
        return alertRepository.findAll();
    }

    public void deleteAlert(Long alertId) {
        alertRepository.deleteById(alertId);

    }

    public Optional<Alert> findById(Long alertId) {
        return alertRepository.findById(alertId);
    }

    public Alert save(Alert alert) {
        return alertRepository.save(alert);
    }

    public void addResult(Long alertId, Boolean success) {
        Optional<Alert> alert = alertRepository.findById(alertId);
        if (alert.isPresent()){
            alert.get().setId(alertId);
            Result result = new Result();
            Date date = new Date();
            result.setDate(date);
            result.setSuccess(success);

            System.out.println("result object:"+ result.toString());

            alert.get().getResultList().add(result);
            alertRepository.save(alert.get());
        }

    }

}
