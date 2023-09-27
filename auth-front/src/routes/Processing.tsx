import PortalLayout from "../layout/PortalLayout";

export default function Processing() {
  return (
    <PortalLayout>
      <h1>Processing</h1>
      <h2>Genera tu Conciliación <code>"WTech"</code></h2>
          <form action="/api/upload/arg" enctype="multipart/form-data" method="post">
            <div>Archivo de México: 
              <input type="file" name="file" multiple="multiple" />
            </div>
            <input type="submit" value="Cargar" />
          </form>
          <form action="/api/upload" enctype="multipart/form-data" method="post">
            <div>Archivo de Argentina: 
              <input type="file" name="file" multiple="multiple" />
            </div>
            <input type="submit" value="Cargar" />
          </form>
          <form action="/api/generate/reconciliation" enctype="multipart/form-data" method="post">
            <input type="submit" value="Procesar" />
          </form>
    </PortalLayout>
  );
}
