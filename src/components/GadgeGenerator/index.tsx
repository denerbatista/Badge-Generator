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


    // function handleGeneratePDF() {
    //     const doc = new jsPDF("l", "pt");

    //     // adicionar imagem de fundo
    //     const background = new Image();
    //     background.src = backgroundBadge;
    //     doc.addImage(background, "JPEG", 40, 10, 200, 300);

    //     doc.setFontSize(12);
    //     doc.addImage(logo, "PNG", 110, 50, 60, 40);
    //     doc.setFont("Arial", "bold");
    //     doc.setFontSize(12);
    //     doc.text(institutionName, 140, 110, { align: "center" });
    //     doc.setFontSize(16);
    //     doc.setFont("Arial", "bold");
    //     doc.text(name, 140, 260, { align: "center" });
    //     doc.setFontSize(12);
    //     doc.setFont("Arial", "");
    //     doc.text(`Matrícula: ${id}`, 140, 260 + 20, { align: "center" });

    //     const photoBlob = new Blob([photo as File], { type: 'image/png' });
    //     const photoURL = URL.createObjectURL(photoBlob);
    //     doc.addImage(photoURL, "PNG", 110, 125, 60, 80);

    //     // doc.setFontSize(12);
    //     // doc.addImage(logo, "PNG", 110, 50, 60, 40);
    //     // doc.setFont("Arial", "bold");
    //     // doc.setFontSize(12);
    //     // doc.text(institutionName, 240, 25, { align: "center" });
    //     // doc.setFontSize(16);
    //     // doc.setFont("Arial", "bold");
    //     // doc.text(name, 240, 70, { align: "center" });
    //     // doc.setFontSize(12);
    //     // doc.setFont("Arial", "");
    //     // doc.text(`Matrícula: ${id}`, 140, 260 + 20, { align: "center" });

    //     doc.save("badges.pdf");
    //   }

    function handleGeneratePDF() {
        const photoBlob = new Blob([photo as File], { type: 'image/png' });
        const photoURL = URL.createObjectURL(photoBlob);
      
        const img = new Image();
        img.src = photoURL;

      
        img.onload = () => {
          const doc = new jsPDF({
            orientation: "p",
            unit: "pt",
            format: [200, 300]
          });
      
          // adicionar imagem de fundo
          const background = new Image();
          background.src = backgroundBadge;
          doc.addImage(background, "JPEG", 0, 0, 200, 300);
      
          doc.setFontSize(12);
          doc.addImage(logo, "PNG", 68, 50, 60, 40);
          doc.setFont("Arial", "bold");
          doc.setFontSize(12);
          doc.text(institutionName, 100, 110, { align: "center" });
          doc.setFontSize(16);
          doc.setFont("Arial", "bold");
          doc.text(name, 100, 260, { align: "center" });
          doc.setFontSize(12);
          doc.setFont("Arial", "");
          doc.text(`Matrícula: ${id}`, 100, 260 + 20, { align: "center" });
      
          doc.addImage(photoURL, "PNG", 68, 125, 60, 80);
      
          doc.save("badge.pdf");
        };
      }
      

      const model2 = () => {
        const doc = new jsPDF("p", "pt");

        // const background = new Image();
        // background.src = backgroundBadge;
        // doc.addImage(background, "JPEG", 40, 10, 200, 300);

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

        // const photoBlob = new Blob([photo as File], { type: 'image/png' });
        // const photoURL = URL.createObjectURL(photoBlob);
        // doc.addImage(photoURL, "PNG", 110, 125, 60, 80);
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

// inicio código 2

// function BadgeGenerator() {
//     const [badgeInfo, setBadgeInfo] = useState<Array<{ name: string, id: string, photo: File | null }>>([
//         { name: '', id: '', photo: null },
//         { name: '', id: '', photo: null },
//         { name: '', id: '', photo: null },
//         { name: '', id: '', photo: null },
//         { name: '', id: '', photo: null },
//         { name: '', id: '', photo: null },
//         { name: '', id: '', photo: null },
//         { name: '', id: '', photo: null },
//     ]);

//     function handleNameChange(event: ChangeEvent<HTMLInputElement>, index: number) {
//         const newBadgeInfo = [...badgeInfo];
//         newBadgeInfo[index].name = event.target.value;
//         setBadgeInfo(newBadgeInfo);
//     }

//     function handleIdChange(event: ChangeEvent<HTMLInputElement>, index: number) {
//         const newBadgeInfo = [...badgeInfo];
//         newBadgeInfo[index].id = event.target.value;
//         setBadgeInfo(newBadgeInfo);
//     }

//     function handlePhotoChange(event: ChangeEvent<HTMLInputElement>, index: number) {
//         if (event.target.files && event.target.files.length > 0) {
//             const newBadgeInfo = [...badgeInfo];
//             newBadgeInfo[index].photo = event.target.files[0];
//             setBadgeInfo(newBadgeInfo);
//         }
//     }

//     function handleGeneratePDF() {
//         const doc = new jsPDF("l", "pt");

//         const badgeWidth = 200; // largura do crachá
//         const badgeHeight = 300; // altura do crachá
//         const margin = 50; // margem da página
//         const spacing = 20; // espaçamento entre os crachás
//         const maxPerLine = 4; // número máximo de crachás por linha
//         const startX = margin; // posição x inicial
//         const startY = margin; // posição y inicial

//         for (let i = 0; i < badgeInfo.length; i++) {
//             const { name, id, photo } = badgeInfo[i];
//             const row = Math.floor(i / maxPerLine);
//             const col = i % maxPerLine;
//             const x = startX + col * (badgeWidth + spacing);
//             const y = startY + row * (badgeHeight + spacing);

//             // adicionar imagem de fundo
//             const background = new Image();
//             background.src = backgroundBadge;
//             doc.addImage(background, "JPEG", x, y, badgeWidth, badgeHeight);

//             // adicionar imagem da logo
//             const logoImage = new Image();
//             logoImage.src = logo;
//             doc.addImage(logoImage, "PNG", x + 10, y + 10, 80, 60);

//             // adicionar foto do participante
//             if (photo) {
//                 const reader = new FileReader();
//                 reader.readAsDataURL(photo);
//                 reader.onloadend = () => {
//                     const img = new Image();
//                     img.src = String(reader.result);
//                     doc.addImage(img, "JPEG", x + 100, y + 50, 80, 100);
//                     // adicionar nome do participante
//                     doc.setFontSize(14);
//                     doc.text(name, x + badgeWidth / 2, y + 180, { align: "center" });
//                     // adicionar ID do participante
//                     doc.setFontSize(10);
//                     doc.text(id, x + badgeWidth / 2, y + 200, { align: "center" });
//                     // salvar o crachá atual
//                     if (i === badgeInfo.length - 1) {
//                         doc.save("cracha.pdf");
//                     } else {
//                         doc.addPage();
//                     }
//                 };
//             }
//         }
//     }

//     return (
//         <>
//             <Flex direction="row" alignItems="center" flexWrap="wrap">
//                 {badgeInfo.map((info, index) => (
//                     <Box key={index} m="4" p="4" border="1px solid" borderRadius="lg">
//                         <Stack spacing={4} direction="column" align="center">
//                             <FormControl>
//                                 <FormLabel>Nome</FormLabel>
//                                 <Input value={info.name} onChange={(event) => handleNameChange(event, index)} />
//                             </FormControl>
//                             <FormControl>
//                                 <FormLabel>Identificação</FormLabel>
//                                 <Input value={info.id} onChange={(event) => handleIdChange(event, index)} />
//                             </FormControl>
//                             <FormControl>
//                                 <FormLabel>Foto</FormLabel>
//                                 <Input type="file" accept="image/*" onChange={(event) => handlePhotoChange(event, index)} />
//                             </FormControl>
//                         </Stack>
//                     </Box>
//                 ))}
//             </Flex>
//             <Button onClick={handleGeneratePDF} colorScheme="teal" size="lg">Gerar PDF</Button>
//         </>
//     )
// }

export default BadgeGenerator;

// final codigo 2

