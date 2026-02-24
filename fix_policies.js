import fs from 'fs';
let content = fs.readFileSync('resources/js/Pages/Clinic/Bookings/Create.jsx', 'utf-8');

// The original JSON object starts with const POLICIES = {
// we can find it exactly by indexOf

const start = content.indexOf('const POLICIES = {');
const end = content.indexOf('export default function BookingCreate');

if (start !== -1 && end !== -1) {
    let replaced = content.substring(0, start) + `const POLICIES = {
    privacy: {
        title: "KEBIJAKAN PRIVASI",
    },
    refund: {
        title: "KEBIJAKAN NON-REFUND",
        content: \`Semua pembayaran yang dilakukan melalui platform InDepth Mental Wellness bersifat final dan tidak dapat dikembalikan (non-refundable).\`
    }
};

` + content.substring(end);
    fs.writeFileSync('resources/js/Pages/Clinic/Bookings/Create.jsx', replaced);
    console.log("Replaced successfully!");
} else {
    console.log("Could not find delimiters.");
}
