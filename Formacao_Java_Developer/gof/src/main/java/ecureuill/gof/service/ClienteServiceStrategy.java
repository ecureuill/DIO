package ecureuill.gof.service;

import ecureuill.gof.model.Cliente;

public interface ClienteServiceStrategy {
    
    Iterable<Cliente> findAll();
    Cliente findById(Long id);
    void insert(Cliente cliente);
    void update(Cliente cliente);
    void delete(Long id);
}
