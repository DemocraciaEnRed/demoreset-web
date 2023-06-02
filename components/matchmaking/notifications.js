
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

export const notConnectedAlert = (buefyInstance, title, message, confirmText) => {
  buefyInstance.dialog.alert({
    duration: 3000,
    title,
    message,
    confirmText
  })
}

export const alertSuccess = (buefyInstance, title, message) => {
  buefyInstance.dialog.alert({
    duration: 2000,
    title,
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
