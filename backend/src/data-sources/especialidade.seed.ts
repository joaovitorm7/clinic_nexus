import { DataSource } from 'typeorm';
import { Especialidade } from '../medico/entities/especialidade.entity';

let alreadySeeded = false;

export async function seedEspecialidades(dataSource: DataSource) {
  if (alreadySeeded) {
    return;
  }

  const repo = dataSource.getRepository(Especialidade);

  const especialidades = [
    'Clínico Geral',
    'Cardiologia',
    'Pediatria',
    'Ginecologia',
    'Ortopedia',
    'Dermatologia',
    'Neurologia',
    'Psiquiatria',
    'Endocrinologia',
    'Oftalmologia',
  ];

  const registros = especialidades.map((nome) =>
    repo.create({ nome }),
  );

  await repo.save(registros);

  alreadySeeded = true;
}
