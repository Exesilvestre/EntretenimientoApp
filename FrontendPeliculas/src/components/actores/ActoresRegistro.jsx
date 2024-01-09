import React from "react";

import { useForm } from "react-hook-form";
import nacionalidades from './nacionalidades';
import { BsFlag } from 'react-icons/bs';



export default function ActoresRegistro({
  AccionABMC,
  Item,
  Grabar,
  Volver,
}) {

    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields, isValid, isSubmitted },
      } = useForm({ values: Item });
    
    const onSubmit = (data) => {
        Grabar(data);
    };
  if (!Item) return null;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container-fluid">

        <fieldset disabled={AccionABMC === "C"}>

         {/* campo nombre */}
         <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Nombre">
                Nombre<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("Nombre", {
                  required: { value: true, message: "Nombre es requerido" },
                  minLength: {
                    value: 3,
                    message: "Nombre debe tener al menos 4 caracteres",
                  },
                  maxLength: {
                    value: 30,
                    message: "Nombre debe tener como máximo 30 caracteres",
                  },
                })}
                autoFocus
                className={
                  "form-control " + (errors?.Nombre ? "is-invalid" : "")
                }
              />
              {errors?.Nombre && touchedFields.Nombre && (
                <div className="invalid-feedback">
                  {errors?.Nombre?.message}
                </div>
              )}
            </div>
          </div>

           {/* campo apellido */}
         <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Apellido">
                Apellido<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("Apellido", {
                  required: { value: true, message: "Apellido es requerido" },
                  minLength: {
                    value: 4,
                    message: "Apellido debe tener al menos 4 caracteres",
                  },
                  maxLength: {
                    value: 30,
                    message: "Apellido debe tener como máximo 30 caracteres",
                  },
                })}
                autoFocus
                className={
                  "form-control " + (errors?.Apellido ? "is-invalid" : "")
                }
              />
              {errors?.Apellido && touchedFields.Apellido && (
                <div className="invalid-feedback">
                  {errors?.Apellido?.message}
                </div>
              )}
            </div>
          </div>



          {/* campo FechaNacimiento */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="FechaNacimiento">
                FechaNacimiento<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="date"
                {...register("FechaNacimiento", {
                  required: { value: true, message: "Fecha Nacimiento es requerido" }
                })}
                className={
                  "form-control " + (errors?.FechaNacimiento ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">
                {errors?.FechaNacimiento?.message}
              </div>
            </div>
          </div>

       {/* campo Nacionalidad */}
       <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Nacionalidad">
                Nacionalidad<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <select
                {...register('Nacionalidad', {
                  required: { value: true, message: 'Nacionalidad es requerido' },
                })}
                autoFocus
                className={
                  'form-control ' + (errors?.Nacionalidad ? 'is-invalid' : '')
                }
              >
                <option value="">Selecciona una nacionalidad</option>
                {nacionalidades.map((nacionalidad, index) => (
                  <option key={index} value={nacionalidad.codigoPais}>
                  <BsFlag className="select-flag-icon mr-2s" />
                  {nacionalidad.nombre}
                </option>
                ))}
              </select>
              {errors?.Nacionalidad && touchedFields.Nacionalidad && (
                <div className="invalid-feedback">
                  {errors?.Nacionalidad?.message}
                </div>
              )}
            </div>
          </div>


           {/* campo Premios */}
           <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Premios">
              Premios<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
            <input
            type="number"
            {...register("Premios", {
            required: { value: true, message: "Premios son requeridos" },
            min: {
            value: 0,
            message: "Premios deben ser mayor o igual a 0",
            },
            })}
            className={
            "form-control " + (errors?.Premios ? "is-invalid" : "")
            }
            />
            <div className="invalid-feedback">{errors?.Premios?.message}</div>

        </div>
    </div>


        </fieldset>

        {/* Botones Grabar, Cancelar/Volver' */}
        <hr />
        <div className="row justify-content-center">
          <div className="col text-center botones">
            {AccionABMC !== "C" && (
              <button type="submit" className="btn btn-primary">
                <i className="fa fa-check"></i> Grabar
              </button>
            )}
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => Volver()}
            >
              <i className="fa fa-undo"></i>
              {AccionABMC === "C" ? " Volver" : " Cancelar"}
            </button>
          </div>
        </div>


        {/* texto: Revisar los datos ingresados... */}
        {!isValid && isSubmitted && (
        <div className="row alert alert-danger mensajesAlert">
            <i className="fa fa-exclamation-sign"></i>
            Revisar los datos ingresados...
        </div>
)}


      </div>
    </form>
  );
}
