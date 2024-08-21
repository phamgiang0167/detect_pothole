/// <reference types="nativewind/types" />

type AppLocation = {
    latitude: number;
    longitude: number;
    latitudeDelta?: number;
    longitudeDelta?: number;
    image?: string;
    description?: string;
}

type AnalysisImage = {
    latitude: number;
    longitude: number;
    totalHoles: number;
    holes: {
        width: number;
        length: number;
    };
    avgWidth: number;
    avgLength: number;
    badnessLevel: number;
    shouldAcross: boolean;
    analysisImage: string;
}

type PagedAnalysisResults = {
    data: AnalysisImage[];
    totalPages: number;
    totalPotholes: number;
    currentPage: number;
}