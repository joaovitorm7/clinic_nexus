  export function gerarSlots(
    horaInicio: string,
    horaFim: string,
    duracaoMinutos: number,
  ): { inicio: string; fim: string }[] {
    const slots = [];
    let atual = new Date(`2004-02-03T${horaInicio}:00`);
    const limites = new Date(`2004-02-03T${horaFim}:00`);

    while (atual < limites) {
      const proximo = new Date(atual.getTime() + duracaoMinutos * 60000);
      if (proximo > limites) break;

      slots.push({
        inicio: atual.toTimeString().slice(0, 5),
        fim: proximo.toTimeString().slice(0, 5),
      });

      atual = proximo;
    }
    return slots;
  }

