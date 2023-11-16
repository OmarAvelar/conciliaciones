import PortalLayout from "../layout/PortalLayout";
import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import "../css/globals.css";
import "../css/styleguide.css";
import "../css/style.css";
import imagenUsuario from "./img/foto-de-usuario.png";

export default function Processing() {
  const [doc, setFile] = useState({ preview: "", data: "" });
  const [status, setStatus] = useState("");
  const auth = useAuth();

  async function handleSubmitLoad(e) {
    e.preventDefault();
    // auth.setIsAuthenticated(true);

    let formData = new FormData();
    formData.append("file", doc.data);
    const response = await fetch("http://localhost:3000/api/upload/arg", {
      method: "POST",
      body: formData,
    });
    console.log(response);
    //const kiteUser = auth.getUser()?.name ?? "";
    //Sconsole.log("usuarioSubmit:", kiteUser);

    if (response) setStatus(response.statusText);
  }

  async function handleSubmitLoad2(e) {
    e.preventDefault();
    // auth.setIsAuthenticated(true);

    let formData = new FormData();
    formData.append("file", doc.data);
    const response = await fetch("http://localhost:3000/api/upload", {
      method: "POST",
      body: formData,
    });
    console.log(response);

    if (response) setStatus(response.statusText);
  }

  async function handleSubmitConciliation(e) {
    e.preventDefault();
    // auth.setIsAuthenticated(true);

    let formData = new FormData();
    formData.append("file", doc.data);
    const response = await fetch(
      "http://localhost:3000/api/generate/conciliation",
      {
        method: "POST",
        body: formData,
      }
    );
    if (response.ok) {
      //console.log(response);
    }

    //console.log(response);
    console.log("AquiAcabo");

    //const kiteUser = auth.getUser()?.name ?? "";
    //console.log("usuarioConciliacion:", kiteUser);
    //if (response) setStatus(response.statusText);
  }

  const handleFileChange = (e) => {
    const file = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    console.log(file);
    //const kiteUser = auth.getUser()?.name ?? "";
    //console.log("usuarioFile:", kiteUser);
    setFile(file);
  };

  const handleFileChange2 = (e) => {
    const file = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    console.log(file);
    setFile(file);
  };

  return (
    <PortalLayout>
      <>
        <div className="seleccionar-archivos">
          <div className="div">
            <div className="contenido">
              <div className="filial-3">
                <form onSubmit={handleSubmitLoad} className="form">
                  <div className="seleccionar-archivo">
                    <div className="overlap-group-5">
                      <div className="boton-seleccionar">
                        <div className="div-2">
                          <div className="text-wrapper">
                            Seleccionar Archivo
                          </div>
                          <img className="img" src="/img/vector-11.svg" />
                          <input
                            className="seleccionar-filial-1"
                            type="file"
                            name="file"
                            style={{ opacity: 0 }}
                            onChange={handleFileChange}
                          />
                        </div>
                      </div>
                      <p className="p">Sube tu archivo aquí para empezar</p>
                      <p className="texto-formatos">
                        Formatos permitidos: csv, pdf, xlsx.
                      </p>
                    </div>
                  </div>
                  <div className="contenido-wrapper">
                    <div className="contenido-2">
                      <div className="text-wrapper-submit">Cargar Archivos</div>
                      <img className="vector" src="../img/vector-12.svg" />
                      <input
                        className="submit-filial-1"
                        type="submit"
                        style={{ opacity: 0 }}
                        defaultValue="Cargar"
                      />
                    </div>
                  </div>
                </form>
                <div className="filial-4">
                  <div className="text-wrapper-5">Filial 1</div>
                  <div className="dropdown-2">
                    <div className="overlap-group-4">
                      <div className="flecha-abajo">
                        <img className="vector-4" src="../img/vector-10.svg" />
                      </div>
                      <div className="text-wrapper-6">Nissan México</div>
                    </div>
                  </div>
                </div>
                <div className="archivos-filial-2">
                  <div className="contenedor-archivos">
                    <div className="overlap">
                      <div className="documentos">
                        <div className="doc-subido">
                          <div className="pdf-texto-2">
                            <img
                              className="vector-5"
                              src="../img/vector-7.svg"
                            />
                            <div className="overlap-group-6">
                              <div className="text-wrapper-2">Doc1.pdf</div>
                              <div className="text-wrapper-3">30mb</div>
                            </div>
                            <img
                              className="vector-6"
                              src="../img/vector-6.svg"
                            />
                          </div>
                        </div>
                        <div className="doc-subido-2">
                          <div className="pdf-texto-2">
                            <img
                              className="vector-5"
                              src="../img/vector-7.svg"
                            />
                            <div className="overlap-group-6">
                              <div className="text-wrapper-2">Doc2.pdf</div>
                              <div className="text-wrapper-3">30mb</div>
                            </div>
                            <img
                              className="vector-6"
                              src="../img/vector-6.svg"
                            />
                          </div>
                        </div>
                        <div className="pdf-texto-wrapper">
                          <div className="pdf-texto-2">
                            <img
                              className="vector-7"
                              src="../img/vector-5.svg"
                            />
                            <div className="overlap-group-7">
                              <div className="text-wrapper-2">Doc3.xlsx</div>
                              <div className="text-wrapper-3">30mb</div>
                            </div>
                            <img
                              className="vector-8"
                              src="../img/vector-4.svg"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="fondo-con" />
                    </div>
                  </div>
                  <div className="scroll" />
                </div>
              </div>
              <div className="filial">
                <form onSubmit={handleSubmitLoad} className="form">
                  <div className="seleccionar-archivo">
                    <div className="overlap-group">
                      <div className="boton-seleccionar">
                        <div className="div-2">
                          <div className="text-wrapper">
                            Seleccionar Archivo12
                          </div>
                          <img className="img" src="../img/vector-18.svg" />
                          <input
                            className="seleccionar-filial-2"
                            type="file"
                            name="file"
                            style={{ opacity: 0 }}
                            onChange={handleFileChange2}
                          />
                        </div>
                      </div>
                      <p className="p">Sube tu archivo aquí para empezar</p>
                      <p className="texto-formatos">
                        Formatos permitidos: csv, pdf, xlsx.
                      </p>
                    </div>
                  </div>
                  <div className="boton-cargar">
                    <div className="contenido-2">
                      <div className="text-wrapper-submit">
                        Cargar Archivos12
                      </div>
                      <img className="vector" src="../img/vector-12.svg" />
                      <input
                        className="submit-filial-2"
                        type="submit"
                        style={{ opacity: 0 }}
                        defaultValue="Cargar"
                      />
                    </div>
                  </div>
                </form>
                <div className="archivos-filial">
                  <div className="doc-subido">
                    <img className="vector-2" src="../img/vector-7.svg" />
                    <div className="pdf-texto">
                      <div className="overlap-group-2">
                        <div className="text-wrapper-2">Doc1.pdf</div>
                        <div className="text-wrapper-3">30mb</div>
                      </div>
                    </div>
                    <img className="vector-3" src="../img/vector-6.svg" />
                  </div>
                  <div className="doc-subido-2">
                    <img className="vector-2" src="../img/vector-7.svg" />
                    <div className="overlap-group-wrapper">
                      <div className="overlap-group-3">
                        <div className="text-wrapper-2">Doc2.xlsx</div>
                        <div className="text-wrapper-3">30mb</div>
                      </div>
                    </div>
                    <img className="vector-3" src="../img/vector-6.svg" />
                  </div>
                </div>
                <div className="filial-2">
                  <div className="title">Filial 2</div>
                  <div className="dropdown">
                    <div className="overlap-group-4">
                      <div className="flecha-abajo">
                        <img className="vector-4" src="../img/vector-13.svg" />
                      </div>
                      <div className="text-wrapper-4">Seleccionar Filial</div>
                    </div>
                  </div>
                </div>
              </div>

              <img
                className="linea-divisoria"
                src="../img/linea-divisoria.svg"
              />
            </div>
            <form onSubmit={handleSubmitConciliation} className="form">
              <div className="boton-ejecutar">
                <button className="execute">Generar conciliacion</button>
              </div>
              <div id="container">
                <h1>Download File using React App</h1>
                <h3>Download Employee Data using Button</h3>
                <button onClick={handleSubmitConciliation}>Download</button>
                <p />
                <h3>Download Employee Data using Link</h3>
                <a href="#" onClick={handleSubmitConciliation}>
                  Download
                </a>
              </div>
            </form>
            <div className="titulo">Seleccionar Archivos</div>
            <header className="header">
              <div className="usuario">
                <img className="foto-de-usuario" src={imagenUsuario} />
                <div className="nombre-y-correo">
                  <div className="text-wrapper-8">Javier Solis</div>
                  <div className="text-wrapper-9">javier@gmail.com</div>
                </div>
              </div>
              <img className="linea-superior" src="../img/linea-superior.svg" />
              <div className="header-2">Bienvenido, Javier</div>
            </header>
            <div className="barra-de-navegacin">
              <img className="logo" src="../img/logo.svg" />
              <div className="inicio-wrapper">
                <div className="inicio">
                  <img className="vector-9" src="../img/vector-2.svg" />
                  <div className="text-wrapper-10">Inicio</div>
                </div>
              </div>
              <div className="perfil">
                <img className="vector-10" src="../img/vector-3.svg" />
                <div className="text-wrapper-11">Perfil</div>
              </div>
              <div className="cerrar-sesin">
                <img className="vector-10" src="./ /img/vector-1.svg" />
                <div className="text-wrapper-12">Cerrar Sesión</div>
              </div>
            </div>
          </div>
        </div>
      </>
    </PortalLayout>
  );
}
