export const API_Path = {
    // Authentication
    tokenUrl: "/token",
    registerUrl: "/register",

    // Attraction API
    attractionsUrl: "/attractions/single",
    combosUrl: "/attractions/combo",
    attractionDetailUrl: (id) => `/attractions/single/${id}`,
    ticketCategoriesUrl: (id) => `/attractions/single/${id}/ticket_categories`,
    timeSlotsUrl: (id) => `/attractions/single/${id}/time_slots/available`,
    checkAvailabilityUrl: (id) => `/attractions/single/${id}/ticket_categories/available`,

    // Booking Management API
    createCartUrl: "/carts/new",
    reserveTicketUrl: (id) => `/tickets/${id}/reserve`,
    currentCartUrl: "/carts/current",
    reserveCartUrl: (id) => `/carts/${id}/reserve`,
    checkoutUrl: "/checkout",
    invoiceUrl: (id) => `/orders/${id}/invoice`,
    ticketAttachmentsUrl: (invoiceId) => `/bookings/attachments/by-invoice/${invoiceId}`,
    ticketInventoryUrl: (invoiceId) => `/ticket_inventories/invoice/${invoiceId}`,
};
