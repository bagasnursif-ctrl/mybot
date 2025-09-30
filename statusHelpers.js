const fs = require('fs');

function getScanStatus(scanState) {

    return Promise.resolve(

        `• Bot aktif: ✅\n• Status scan: ${scanState}\n• Pairing: Online\n• Versi: 1.0.0`

    );

}

function getFoundListStats() {

    try {

        const found = JSON.parse(fs.readFileSync('foundlist.json'));

        return Promise.resolve(

            `• Total link valid: ${found.length}\n• Contoh:\n${found.slice(0, 3).map(d =>

                `- ${d.name || '(Tanpa Nama)'} (${d.memberCount || 0} member)`

            ).join('\n')}`

        );

    } catch {

        return Promise.resolve(`• Tidak ada foundlist.`);

    }

}

function getFoundListPreview() {

    try {

        const found = JSON.parse(fs.readFileSync('foundlist.json'));

        if (!found.length) return "Belum ada hasil scan.";

        let text = `*Hasil Scan Link Grup Valid*\nTotal: ${found.length} grup\n\n`;

        found.slice(0, 10).forEach((d, i) => {

            text += `${i + 1}. ${d.name || '(Tanpa Nama)'}\n   Link: ${d.link}\n   Member: ${d.memberCount || 0}\n   Creator: ${d.creator || '-'}\n   SharedBy: ${d.sharedBy || '-'}\n\n`;

        });

        if (found.length > 10) text += `Dan ${found.length - 10} lagi.`;

        return text;

    } catch {

        return "Belum ada hasil scan.";

    }

}

function getFoundListBySharerPrefix(prefix) {

    try {

        const found = JSON.parse(fs.readFileSync('foundlist.json'));

        const filtered = found.filter(d => d.sharedBy && (d.sharedBy.startsWith(prefix) || d.sharedBy.startsWith(prefix.replace('+',''))));

        if (!filtered.length) return `Tidak ada hasil untuk prefix ${prefix}`;

        let region = prefix === "+60" ? "Malaysia" : (prefix === "+62" ? "Indonesia" : prefix);

        let text = `*Hasil Grup yang Disubmit ${region}*\nTotal: ${filtered.length} grup\n\n`;

        filtered.slice(0, 10).forEach((d, i) => {

            text += `${i + 1}. ${d.name || '(Tanpa Nama)'}\n   Link: ${d.link}\n   Member: ${d.memberCount || 0}\n   Creator: ${d.creator || '-'}\n   SharedBy: ${d.sharedBy || '-'}\n\n`;

        });

        if (filtered.length > 10) text += `Dan ${filtered.length - 10} lagi.`;

        return text;

    } catch {

        return "Belum ada hasil scan.";

    }

}

module.exports = { getScanStatus, getFoundListStats, getFoundListPreview, getFoundListBySharerPrefix };