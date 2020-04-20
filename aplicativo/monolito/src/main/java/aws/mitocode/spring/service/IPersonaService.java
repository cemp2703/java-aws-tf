package aws.mitocode.spring.service;

import java.util.List;

import aws.mitocode.spring.model.Persona;

public interface IPersonaService {

	List<Persona> obtenerPorRangoEdad(
			int edadMenor,
			int edadMayor);
	
	List<Persona> listarTodos();
	Persona obtenerPorId(int idPersona);
	void guardarDatos(Persona persona);
	void eliminarDatos(int personaId);
}
