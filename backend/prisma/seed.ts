import { Driver, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const drivers: Driver[] = [
    {
      id: 1,
      name: 'Homer Simpson',
      description: 'Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).',
      car: 'Plymouth Valiant 1973 rosa e enferrujado',
      rating: '2/5',
      comment: 'Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.',
      fare: 2.50,
      minKm: 1
    },
    {
      id: 2,
      name: 'Dominic Toretto',
      description: 'Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.',
      car: 'Dodge Charger R/T 1970 modificado',
      rating: '4/5',
      comment: 'Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!',
      fare: 5.00,
      minKm: 5
    },
    {
      id: 3,
      name: 'James Bond',
      description: 'Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.',
      car: 'Aston Martin DB5 clássico',
      rating: '5/5',
      comment: 'Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.',
      fare: 10.00,
      minKm: 10
    }
  ]

  await Promise.all(
    drivers.map(async (driver) => {
      const driverDB = await prisma.driver.findUnique({ where: { id: driver.id } })
      if (driverDB) return

      await prisma.driver.create({
        data: driver
      })
    })
  )
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })