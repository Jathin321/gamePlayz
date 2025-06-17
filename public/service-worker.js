// Replace with more robust service worker

// Service worker for notifications
self.addEventListener("install", (event) => {
  console.log("Service Worker installing.");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activating.");
  event.waitUntil(self.clients.claim());
});

// Handle push notifications
self.addEventListener("push", (event) => {
  if (event.data) {
    try {
      const data = event.data.json();
      
      const options = {
        body: data.body || "New announcement",
        icon: data.icon || "/icons/announcement.png",
        badge: data.badge || "/icons/badge.png",
        tag: data.tag || "announcement",
        vibrate: [100, 50, 100], // Important for mobile
        data: {
          url: data.url || "/"
        }
      };
      
      event.waitUntil(
        self.registration.showNotification(data.title || "New Notification", options)
      );
    } catch (error) {
      console.error("Error processing push notification:", error);
    }
  }
});

// Handle notification clicks
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  
  const urlToOpen = event.notification.data?.url || "/";
  
  event.waitUntil(
    clients.matchAll({type: "window"}).then((clientList) => {
      // Check if a window is already open
      for (const client of clientList) {
        if (client.url === urlToOpen && "focus" in client) {
          return client.focus();
        }
      }
      
      // If no window is open, open a new one
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});