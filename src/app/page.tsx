import createSEO from "../utils/seo"
import HomePage from "@/page/HomePage"

export const metadata = createSEO({ title: "Trang chủ" })

export default function page() {
  // useEffect(() => {
  //   const requestNotificationPermission = () => {
  //     if ("Notification" in window == false) {
  //       toast.error("This browser does not support notifications.")
  //     } else {
  //       if (Notification.permission !== "granted") {
  //         Notification.requestPermission()
  //           .then((result) => {
  //             console.log(`Notification permission: ${result}`)
  //           })
  //           .catch((err) => {
  //             console.error("Permission request failed:", err)
  //           })
  //       }
  //     }
  //   }
  //   requestNotificationPermission()
  //   if ("serviceWorker" in navigator) {
  //     navigator.serviceWorker
  //       .register("./workers/notification.sw.js")
  //       .then((registration) => {
  //         console.log("Service Worker registered:", registration)
  //         if (registration.active) {
  //           console.log("Service Worker is already active")
  //           registration.active.postMessage({ type: "START", num: 1 })

  //           navigator.serviceWorker.addEventListener("message", (event) => {
  //             console.log("Message from Service Worker:", event.data)
  //           })
  //         } else {
  //           navigator.serviceWorker.ready.then((registration) => {
  //             console.log("Service Worker is ready")
  //             if (registration.active) {
  //               registration.active.postMessage({ type: "START", num: 1 })
  //             }
  //           })
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Service Worker registration failed:", error)
  //       })
  //   }
  //   // listening for order data and notify user
  //   const eventSource = new EventSourcePolyfill(
  //     "https://futurelife-be.onrender.com/events",
  //     {
  //       headers: {
  //         Authorization: `Bearer ${session?.user.access_token}`,
  //       },
  //     }
  //   )
  //   eventSource.onmessage = function (event) {
  //     console.log("New message:", event.data)
  //     createNotification({
  //       title: JSON.stringify(event.data),
  //       icon: "./assets/rem2.png",
  //       body: `Đơn hàng ${123} đang ${123}`,
  //     })
  //   }
  //   eventSource.onerror = function (error) {
  //     console.log("Error occurred:", error)
  //   }
  //   // worker chạy trong nền
  //   // const worker = new Worker("./workers/worker.service.js")
  //   // worker.postMessage({ num: 1 })
  //   // worker.onmessage = (e) => {
  //   //   createNotification({ title: 'Trạng thái đơn hàng', icon: './assets/rem2.png', body: `Đơn hàng ${e.data}` })
  //   // }
  // }, [])

  return (
    <HomePage />
  )
}