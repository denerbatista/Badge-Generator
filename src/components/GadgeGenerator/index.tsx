import { useState, ChangeEvent } from 'react';
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Stack,
} from '@chakra-ui/react';
import { jsPDF } from 'jspdf';
import logo from '../../assets/logo.png'; // importa a imagem da logo da Cidade de Aracruz
import backgroundBadge from '../../assets/background.png'; // importa a imagem da background do crachá



function BadgeGenerator() {
    const [name, setName] = useState<string>('');
    const [id, setId] = useState<string>('');
    const [institutionName] = useState<string>('CMEB Mário Leal Silva');

    const [showPhoto, setShowPhoto] = useState<boolean>(false);
    const [photo, setPhoto] = useState<File | null>(null);

    function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
    }

    function handleIdChange(event: ChangeEvent<HTMLInputElement>) {
        setId(event.target.value);
    }

    function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.files && event.target.files.length > 0) {
            setPhoto(event.target.files[0]);
        }
    }

    
    function handleGeneratePDF() {
        const doc = new jsPDF("l", "pt");
        
        // adicionar imagem de fundo
        const background = new Image();
        background.src = backgroundBadge;
        doc.addImage(background, "JPEG", 40, 10, 200, 300);
        
        doc.setFontSize(12);
        doc.addImage(logo, "PNG", 110, 50, 60, 40);
        doc.setFont("Arial", "bold");
        doc.setFontSize(12);
        doc.text(institutionName, 140, 110, { align: "center" });
        doc.setFontSize(16);
        doc.setFont("Arial", "bold");
        doc.text(name, 140, 260, { align: "center" });
        doc.setFontSize(12);
        doc.setFont("Arial", "");
        doc.text(`Matrícula: ${id}`, 140, 260 + 20, { align: "center" });
      
        const photoBlob = new Blob([photo as File], { type: 'image/png' });
        const photoURL = URL.createObjectURL(photoBlob);
        doc.addImage(photoURL, "PNG", 110, 125, 60, 80);
      
        doc.save("badges.pdf");
      }
      

    return (
        <Box>
            <Stack spacing={3}>
                <FormControl>
                    <FormLabel>Nome Completo:</FormLabel>
                    <Input type="text" value={name} onChange={handleNameChange} />
                </FormControl>

                <FormControl>
                    <FormLabel>Matrícula:</FormLabel>
                    <Input type="text" value={id} onChange={handleIdChange} />
                </FormControl>

                <FormControl>
                    <FormLabel>Adicionar foto:</FormLabel>
                    <Flex alignItems="center">
                        <Input type="file" onChange={handlePhotoChange} display={'block'}  isRequired/>
                    </Flex>
                </FormControl>

                <Button onClick={handleGeneratePDF}>Gerar PDF</Button>
            </Stack>
        </Box>
    );
}

export default BadgeGenerator;