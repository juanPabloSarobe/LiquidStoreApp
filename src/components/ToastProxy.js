import Toast from "react-native-root-toast";

export default function toast(
  text,
  duration = Toast.durations.SHORT,
  position = Toast.positions.BOTTOM,
  backgroundColor = null,
  textColor = null,
  delay = 0
) {
  return Toast.show(text, {
    duration: duration,
    position: position,
    shadow: false,
    animation: true,
    hideOnPress: true,
    delay: delay,
    backgroundColor: backgroundColor,
    textColor: textColor,
    opacity: 1,
  });
}

export function hideToast(toast) {
  Toast.hide(toast);
}
