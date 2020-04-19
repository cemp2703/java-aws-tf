package taller.ninja.demodocker.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "personas")
public class Persona implements Serializable {
	
	private static final long serialVersionUID = 2445247993956960711L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "nombre", nullable = false, length = 50)
	private String nombre;

	@Column(name = "apellidos", nullable = false, length = 50)
	private String apellidos;
	
	@Column(name = "edad", nullable = false, length = 2)
	private Integer edad;

	@Column(name = "sexo", nullable = true, length = 1)
	private String sexo;

	@Column(name = "profesion", nullable = true, length = 20)
	private String profesion;

	@Column(name = "lugarTrabajo", nullable = true, length = 30)
	private String lugarTrabajo;

	@Column(name = "lenguajeProgramacion", nullable = true, length = 50)
	private String lenguajeProgramacion;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getApellidos() {
		return apellidos;
	}

	public void setApellidos(String apellidos) {
		this.apellidos = apellidos;
	}

	public Integer getEdad(){
		return this.edad;
	}

	public void setEdad(int edad){
		this.edad = edad;
	}

	public String getSexo(){
		return this.sexo;
	}

	public void setSexo(String sexo){
		this.sexo = sexo;
	}

	public String getProfesion(){
		return this.profesion;
	}

	public void setProfesion(String profesion){
		this.profesion = profesion;
	}

	public String getLugarTrabajo(){
		return this.lugarTrabajo;
	}

	public void setLugarTrabajo(String lugarTrabajo){
		this.lugarTrabajo = lugarTrabajo;
	}

	public String getLenguajeProgramacion(){
		return this.lenguajeProgramacion;
	}

	public void setLenguajeProgramacion(String lenguajeProgramacion){
		this.lenguajeProgramacion = lenguajeProgramacion;
	}

}
