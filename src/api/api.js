import { ApiGet, ApiPost } from './API_data';
import { API_Path } from './APIComment';

export const api = {
    // 1. GET /attractions/single
    // 1. GET /attractions/single (Step 1)
    getSingleAttractions: async (filters = {}) => {
        let url = API_Path.attractionsUrl;
        const params = new URLSearchParams();
        // User spec: title=<title>&activeAttractions=true&includeAttachments=true&page=0&size=1
        if (filters.search) params.append('title', filters.search); // changed from 'search' to 'title'
        params.append('activeAttractions', 'true'); // defaults
        params.append('includeAttachments', 'true');
        params.append('page', filters.page || 0);
        params.append('size', filters.size || 20); // Default to 20 for list view, Step 1 says size=1 but that's for specific search

        if (filters.category) params.append('category', filters.category);

        url += `?${params.toString()}`;
        
        const res = await ApiGet(url);
        return res?.content || res; // return content array
    },

    // 2. GET /attractions/combo
    getComboAttractions: async () => {
        const res = await ApiGet(API_Path.combosUrl);
        return res?.content || res; // Assuming similar structure
    },

    // 3. GET /attractions/single/{id} (Step 2)
    getAttractionDetails: async (id) => {
        const res = await ApiGet(API_Path.attractionDetailUrl(id));
        return res; // Step 2 response is direct object
    },

    // 4. GET /attractions/single/{attractionId}/ticket_categories
    getTicketCategories: async (attractionId) => {
        const res = await ApiGet(API_Path.ticketCategoriesUrl(attractionId));
        return res?.content || res;
    },

    // 3. GET /attractions/single/{id}/time_slots/available (Step 3)
    getTimeSlots: async (attractionId, date) => {
        const url = `${API_Path.timeSlotsUrl(attractionId)}?date=${date}`;
        const res = await ApiGet(url);
        return res; // Step 3 response is direct array
    },

    // 4. GET ticket categories available (Step 4)
    getAvailableCategories: async (attractionId, date, entry, exit) => {
        let url = `${API_Path.checkAvailabilityUrl(attractionId)}?date=${date}`;
        if (entry) url += `&entry=${entry}`;
        if (exit) url += `&exit=${exit}`;
        const res = await ApiGet(url);
        // Step 4 response: { content: [ { name: "Group Name", tickets: [...] } ] }
        if (res?.content && res.content.length > 0) {
            // We flatten this for the TicketSelector, assuming single category group for simplicity 
            // OR we return the first group's tickets enriched with group info.
            const group = res.content[0];
            return group.tickets.map(t => ({
                ...t,
                name: t.ticket_type.name, // "Adult"
                groupName: group.name, // "Prime Time..."
                description: group.description, 
                price: t.price,
                discountedPrice: t.discounted_price
            }));
        }
        return [];
    },

    // 5. POST /carts/new (Step 5)
    createCart: async () => {
        const res = await ApiPost(API_Path.createCartUrl, {});
        return res; // Returns { id: ... }
    },

    // 6. POST /tickets/{ticketId}/reserve (Step 6)
    reserveTicket: async (ticketId, body) => {
        const res = await ApiPost(API_Path.reserveTicketUrl(ticketId), body);
        return res;
    },

    // 7. POST /carts/{cartId}/reserve (Step 7)
    reserveCart: async (cartId) => {
        const res = await ApiPost(API_Path.reserveCartUrl(cartId), {});
        return res;
    },

    // 8. POST /checkout (Step 8)
    checkout: async (body) => {
        const res = await ApiPost(API_Path.checkoutUrl, body);
        return res; // Returns { invoice_id: ..., id: ... }
    },

    // 9. GET /orders/{orderId}/invoice (Step 9)
    getInvoice: async (orderId) => {
        // This endpoint likely returns a file/stream. 
        // We might need to handle it differently if we want to download.
        // For now, let's assumes ApiGet handles it or returns the blob.
        // If it sends back binary, axios needs responseType: 'blob'
        // But ApiGet doesn't support that override easily yet without mod.
        // We will assume standard GET for now.
        const res = await ApiGet(API_Path.invoiceUrl(orderId));
        return res;
    },

    // 10. GET /bookings/attachments/by-invoice/{invoiceId} (Step 10)
    getTicketAttachments: async (invoiceId) => {
        const res = await ApiGet(API_Path.ticketAttachmentsUrl(invoiceId));
        return res; // Step 10 returns array: [ { public_url: ... } ]
    },

    // 11. GET /ticket_inventories/invoice/{invoiceId} (Step 11)
    getTicketInventory: async (invoiceId) => {
        const res = await ApiGet(API_Path.ticketInventoryUrl(invoiceId));
        return res; // Step 11 returns array
    }
};
