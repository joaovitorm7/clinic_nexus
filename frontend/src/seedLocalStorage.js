export function seedLocalStorage() {
    const jaExiste = localStorage.getItem("clinicnexus_seed");

    if (jaExiste) return;

    const medicos = [
        {
            id: 1,
            nome: "Dra. Ketelyn",
            crm: "CRM-1001",
            especialidade: "Cardiologia"
        },
        {
            id: 2,
            nome: "Dr. Alex Silva",
            crm: "CRM-1002",
            especialidade: "Dermatologia"
        },
        {
            id: 3,
            nome: "Dra. Roberta",
            crm: "CRM-1003",
            especialidade: "Pediatria"
        }
    ];

    const agendas = [
        {
            id: 1,
            id_medico: 1,
            data: "2025-12-08",
            hora_inicio: "08:00",
            hora_fim: "10:00",
            status: "disponivel"
        },
        {
            id: 2,
            id_medico: 2,
            data: "2025-12-08",
            hora_inicio: "13:00",
            hora_fim: "15:00",
            status: "disponivel"
        },
        {
            id: 3,
            id_medico: 3,
            data: "2025-12-09",
            hora_inicio: "09:00",
            hora_fim: "11:00",
            status: "ocupado"
        }
    ];

    localStorage.setItem("medicos", JSON.stringify(medicos));
    localStorage.setItem("agendas", JSON.stringify(agendas));

    localStorage.setItem("clinicnexus_seed", "true");

    console.log("LocalStorage preenchido com dados iniciais.");
}