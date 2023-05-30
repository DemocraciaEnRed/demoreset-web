
export const actionNotification = (buefyInstance, duration, message, type, icon) => {
  buefyInstance.notification.open({
    duration,
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
    duration: 3000,
    title: 'No estás conectado',
    message: 'Para poder enviar un comentario debes tener una cuenta. Si aún no la tiene, puede generarla haciendo <a href="/register" class="has-text-primary">click aquí</a>. <br> Si ya tienes una cuenta, <a href="/login" class="has-text-primary">inicia sesión</a>. ',
    confirmText: 'Aceptar'
  })
}

export const alertSuccess = (buefyInstance, message) => {
  buefyInstance.dialog.alert({
    duration: 2000,
    title: 'Cuenta creada',
    message,
    type: 'is-success',
    hasIcon: true,
    icon: 'check-circle',
    iconPack: 'fa',
    ariaRole: 'alertdialog',
    ariaModal: true
  })
}

export const alertCustomError = (buefyInstance, message) => {
  buefyInstance.dialog.alert({
    duration: 2000,
    title: 'Error',
    message,
    type: 'is-danger',
    hasIcon: true,
    icon: 'times-circle',
    iconPack: 'fa',
    ariaRole: 'alertdialog',
    ariaModal: true
  })
}
