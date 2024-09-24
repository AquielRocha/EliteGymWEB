import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";



export default function Aulas() {

    const mockData = [
        { id: 1, title: "Yoga", description: "A relaxing yoga class." },
        { id: 2, title: "Pilates", description: "Strengthen your core with Pilates." },
        { id: 3, title: "Zumba", description: "Dance your way to fitness with Zumba." },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            
            {mockData.map((aula) => (
                <Card key={aula.id}>
                    <CardHeader>
                        <CardTitle>{aula.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{aula.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}