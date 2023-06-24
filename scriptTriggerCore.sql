use proyecto_nest

-- Trigger para AFTER INSERT
DELIMITER //

CREATE TRIGGER after_insert_reporteventaproducto
AFTER INSERT ON reporteventaproducto
FOR EACH ROW
BEGIN
  DECLARE puntaje DECIMAL(10, 2);

  -- Realiza el cálculo del puntaje utilizando los valores insertados
  SET puntaje = (NEW.precioVenta * NEW.totalVendido )/ (NEW.totalVendido * (
    SELECT precioCompra FROM producto WHERE nombre = NEW.nombreproducto
  ));

  -- Inserta los datos en la tabla TopProductos
  IF EXISTS (
    SELECT 1 FROM topproducto WHERE nombre = NEW.nombreproducto
  ) THEN
    UPDATE topproducto
    SET puntaje = puntaje + (NEW.precioVenta * NEW.totalVendido )/ (NEW.totalVendido * (
      SELECT precioCompra FROM producto WHERE nombre = NEW.nombreproducto
    ))
    WHERE nombre = NEW.nombreproducto;
  ELSE
    INSERT INTO topproducto (nombre, imagenUrl, descripcion, puntaje)
    SELECT p.nombre, p.imagenUrl, p.descripcion, puntaje
    FROM producto p
    WHERE p.nombre = NEW.nombreproducto;
  END IF;
END //

-- Trigger para AFTER UPDATE
CREATE TRIGGER after_update_reporteventaproducto
AFTER UPDATE ON reporteventaproducto
FOR EACH ROW
BEGIN
  DECLARE puntaje DECIMAL(10, 2);

  -- Realiza el cálculo del puntaje utilizando los valores actualizados
  SET puntaje = (NEW.precioVenta * NEW.totalVendido )/ (NEW.totalVendido * (
    SELECT precioCompra FROM producto WHERE nombre = NEW.nombreproducto
  ));

  -- Actualiza los datos en la tabla TopProductos
  IF EXISTS (
    SELECT 1 FROM topproducto WHERE nombre = NEW.nombreproducto
  ) THEN
    UPDATE TopProductos
    SET puntaje = puntaje + (NEW.precioVenta * NEW.totalVendido )/ (NEW.totalVendido * (
      SELECT precioCompra FROM producto WHERE nombre = NEW.nombreproducto
    ))
    WHERE nombre = NEW.nombreproducto;
  ELSE
    INSERT INTO topproducto (nombre, imagenUrl, descripcion, puntaje)
    SELECT p.nombre, p.imagenUrl, p.descripcion, puntaje
    FROM producto p
    WHERE p.nombre = NEW.nombreproducto;
  END IF;
END //

DELIMITER ;


--         Trigger para proveedor mas confiable

-- Trigger para AFTER INSERT
DELIMITER //

CREATE TRIGGER after_insert_detallecontrato
AFTER INSERT ON detallecontrato
FOR EACH ROW
BEGIN
  DECLARE puntaje DECIMAL(10, 2);

  -- Realiza el cálculo del puntaje utilizando los valores insertados
  SET puntaje = DATEDIFF(
    (SELECT fechaFin FROM contrato WHERE identificador = NEW.identificadorContrato),
    NEW.fechaEntregaRealizada
  );

  -- Suma el puntaje de la tabla "topproducto"
  SET puntaje = puntaje + (
    SELECT puntaje FROM topproducto WHERE nombre = (
      SELECT nombre FROM producto WHERE nombreproveedor = (
        SELECT proveedor FROM contrato WHERE identificador = NEW.identificadorContrato
      )
    )
  );

  -- Actualiza los datos en la tabla ProveedorMasConfiable
  IF EXISTS (
    SELECT 1 FROM proveedormasconfiable WHERE nombreproveedor = (
      SELECT proveedor FROM contrato WHERE identificador = NEW.identificadorContrato
    ) AND producto = (
      SELECT nombre FROM producto WHERE nombreproveedor = (
        SELECT proveedor FROM contrato WHERE identificador = NEW.identificadorContrato
      )
    )
  ) THEN
    UPDATE proveedormasconfiable
    SET puntaje = puntaje + puntaje
    WHERE nombreproveedor = (
      SELECT proveedor FROM contrato WHERE identificador = NEW.identificadorContrato
    ) AND producto = (
      SELECT nombre FROM producto WHERE nombreproveedor = (
        SELECT proveedor FROM contrato WHERE identificador = NEW.identificadorContrato
      )
    );
  ELSE
    INSERT INTO proveedormasconfiable (ruc, nombreproveedor, producto, puntaje)
    SELECT p.ruc, p.nombre, pr.nombre, puntaje
    FROM proveedor p
    INNER JOIN contrato c ON p.nombre = c.proveedor
    INNER JOIN producto pr ON p.nombre = pr.nombreproveedor
    INNER JOIN detallecontrato dc ON c.identificador = dc.identificadorContrato
    WHERE c.identificador = NEW.identificadorContrato;
  END IF;
END //

-- Trigger para AFTER UPDATE
CREATE TRIGGER after_update_detallecontrato
AFTER UPDATE ON detallecontrato
FOR EACH ROW
BEGIN
  DECLARE puntaje DECIMAL(10, 2);

  -- Realiza el cálculo del puntaje utilizando los valores actualizados
  SET puntaje = DATEDIFF(
    (SELECT fechaFin FROM contrato WHERE identificador = NEW.identificadorContrato),
    NEW.fechaEntregaRealizada
  );

  -- Suma el puntaje de la tabla "topproducto"
  SET puntaje = puntaje + (
    SELECT puntaje FROM topproducto WHERE nombre = (
      SELECT nombre FROM producto WHERE nombreproveedor = (
        SELECT proveedor FROM contrato WHERE identificador = NEW.identificadorContrato
      )
    )
  );

  -- Actualiza los datos en la tabla ProveedorMasConfiable
  IF EXISTS (
    SELECT 1 FROM proveedormasconfiable WHERE nombreproveedor = (
      SELECT proveedor FROM contrato WHERE identificador = NEW.identificadorContrato
    ) AND producto = (
      SELECT nombre FROM producto WHERE nombreproveedor = (
        SELECT proveedor FROM contrato WHERE identificador = NEW.identificadorContrato
      )
    )
  ) THEN
    UPDATE proveedormasconfiable
    SET puntaje = puntaje + puntaje
    WHERE nombreproveedor = (
      SELECT proveedor FROM contrato WHERE identificador = NEW.identificadorContrato
    ) AND producto = (
      SELECT nombre FROM producto WHERE nombreproveedor = (
        SELECT proveedor FROM contrato WHERE identificador = NEW.identificadorContrato
      )
    );
  ELSE
    INSERT INTO proveedormasconfiable (ruc, nombreproveedor, producto, puntaje)
    SELECT p.ruc, p.nombre, pr.nombre, puntaje
    FROM proveedor p
    INNER JOIN contrato c ON p.nombre = c.proveedor
    INNER JOIN producto pr ON p.nombre = pr.nombreproveedor
    INNER JOIN detallecontrato dc ON c.identificador = dc.identificadorContrato
    WHERE c.identificador = NEW.identificadorContrato;
  END IF;
END //

DELIMITER ;




-- drop trigger after_update_reporteventaproducto
-- drop trigger after_insert_reporteventaproducto
-- drop trigger after_insert_detallecontrato
-- drop trigger after_update_detallecontrato


