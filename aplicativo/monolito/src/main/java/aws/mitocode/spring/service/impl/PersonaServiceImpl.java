package aws.mitocode.spring.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import aws.mitocode.spring.dao.IPersonaDao;
import aws.mitocode.spring.model.Persona;
import aws.mitocode.spring.service.IPersonaService;

@Service
public class PersonaServiceImpl implements IPersonaService {

	@Autowired
	private IPersonaDao dao;

	@Override
	public List<Persona> obtenerPorRangoEdad(int edadMenor, int edadMayor) {
		return this.dao.obtenerPorRangoEdad(edadMenor, edadMayor);
	}

	@Override
	public List<Persona> listarTodos() {
		return this.dao.findAll();
	}

	@Override
	public void guardarDatos(Persona persona) {
		this.dao.save(persona);
	}

	@Override
	public void eliminarDatos(int personaId) {
		this.dao.delete(personaId);
	}

	@Override
	public Persona obtenerPorId(int idPersona) {
		return this.dao.getOne(idPersona);
	}

}
