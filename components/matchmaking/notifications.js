
export const actionNotification = (buefyInstance, message, type, icon) => {
  buefyInstance.notification.open({
    duration: 3000,
    message,
    position: 'is-bottom-right',
    closable: false,
    type,
    hasIcon: true,
    iconPack: 'fas',
    iconSize: 'is-medium',
    icon
  })
}

export const notConnectedAlert = (buefyInstance) => {
  buefyInstance.dialog.alert({
    title: 'No estás conectado',
    message: 'Para poder enviar un comentario debes tener una cuenta. Si aún no la tiene, puede generarla haciendo <a href="/register" class="has-text-primary">click aquí</a>. <br> Si ya tienes una cuenta, <a href="/login" class="has-text-primary">inicia sesión</a>. ',
    confirmText: 'Aceptar'
  })
}
