import React, { useState } from "react";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { editRequestAction } from "../../Actions/ActionsRequests";
import moment from "moment";
const Order = ({ order, usdToBs }) => {
  let dispatch = useDispatch();
  const editOrderFn = (order) => dispatch(editRequestAction(order));
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  const format = "DD/MM/YYYY";
  return (
    <>
      <div className="card mb-3 rounded">
        <div
          className={`card-header ${
            order.state ? "bg-dark text-light" : "bg-warning"
          }`}
        >
          <p className="card-title">
            De: {order.dataBuyer.ci} {order.dataBuyer.correo || ""}
          </p>
          <p className="card-title">
            Telefono: {order.dataBuyer.tlf}{" "}
            <span>({order.dataBuyer.banco.name})</span>
          </p>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <p className="card-text">
              Cantidad: ${order.amount} /{" "}
              {"Bs. ".concat((order.amount * usdToBs).toFixed(2))}
            </p>
            <p className="card-text">
              Fecha: {moment(order.date).format(format)}
            </p>
            <Typography variant="span">
              {order.state ? "Completada" : "Pendiente"}
            </Typography>
          </Grid>
          {!order.state ? (
            <>
              <button
                onClick={() => {
                  editOrderFn({ ...order, state: true });
                }}
                className="btn bg-light"
              >
                Completar
              </button>
              <button
                onClick={() => {
                  Swal.fire({
                    icon: "warning",
                    title: "Que ha ocurrido con este pedido?",
                    showCancelButton: true,
                    input: "select",
                    inputPlaceholder: "Seleccionar",
                    inputOptions: {
                      problem1: "No he recibido el dinero",
                      problem2:
                        "Uno o mas productos dentro de la orden no se encuentran disponibles",
                      problem3: "Devolucion del dinero",
                      problem4: "Tengo otro problema",
                    },
                    text: "Para eliminar una order, primero debes elegir la razon por la cual se va eliminar",
                    confirmButtonText: "Siguiente",
                    cancelButtonText: "Cancelar",
                  }).then((result) => {
                    if (result.value === "problem4") {
                      Swal.fire({
                        input: "textarea",
                        inputLabel: "Message",
                        inputPlaceholder: "Type your message here...",
                        inputAttributes: {
                          "aria-label": "Type your message here",
                        },
                        showCancelButton: true,
                      }).then((result) => {
                        if (result.isConfirmed) {
                          Swal.fire({
                            title: "En breve será confirmado!",
                            icon: "info",
                          });
                        }
                      });
                    } else if (result.isConfirmed) {
                      Swal.fire({
                        title: "Ahora envianos un capture como comprobante",
                        icon: "warning",
                        input: "file",
                        text: "Debe coincidir con la fecha y hora de este pedido",
                        showCancelButton: true,
                        confirmButtonText: "Enviar",
                        cancelButtonText: "Cancelar",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          //editOrderFn({...order, pendingDelete: true})
                          Swal.fire({
                            title: "En breve será confirmado!",
                            icon: "info",
                          });
                        }
                      });
                    }
                  });
                }}
                className="btn bg-danger text-white"
              >
                Eliminar
              </button>
            </>
          ) : null}
        </div>
        <div className="card-body">
          <div className="card-text">
            <ul className="list-group">
              <ListItemButton onClick={handleClick}>
                <ListItemText component="p">
                  {" "}
                  {open ? "Cerrar carrito" : "Mostrar carrito"}
                </ListItemText>
                {open ? <div>&#8593;</div> : <div>&#8595;</div>}
              </ListItemButton>
              {order.bag.map((product) => (
                <>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4, cursor: "default" }}>
                        <Typography component="h3">
                          {product.productname}
                        </Typography>
                        <ListItemText
                          primary={"$".concat(product.price)}
                          className="d-flex justify-content-end"
                        />
                      </ListItemButton>
                    </List>
                  </Collapse>
                </>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
