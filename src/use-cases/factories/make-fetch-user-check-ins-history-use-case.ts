import { PrismaCheckInRepository } from "../../repositories/prisma/prisma-check-ins-repository"
import { FetchUserCheckInsHistoryUseCase } from "../fetch-user-check-ins-history"

export function makeFetchCheckInsHistoryUseCase() {
    const checkInsRepository = new PrismaCheckInRepository()
    const useCase = new FetchUserCheckInsHistoryUseCase(checkInsRepository)

    return useCase
}