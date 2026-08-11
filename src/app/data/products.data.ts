import { Product } from '../interfaces/product';

export const productsData: Product[] = [
  {
    id: 1,
    name: 'Placa de Vídeo NVIDIA GeForce RTX 5070',
    description:
      'Placa de vídeo NVIDIA GeForce RTX 5070 com 12GB GDDR7, ideal para jogos em alta resolução e aplicações de inteligência artificial.',
    price: 4899.9,
    image: 'assets/images/rtx5070.png',
    category: 'Placa de Vídeo',
    stock: 8,
    visible: true,
  },
  {
    id: 2,
    name: 'AMD Ryzen 7 9800X3D',
    description:
      'Processador AMD Ryzen 7 9800X3D com tecnologia 3D V-Cache, excelente desempenho para jogos e produtividade.',
    price: 3199.9,
    image: 'assets/images/ryzen9800x3d.png',
    category: 'Processador',
    stock: 12,
    visible: true,
  },
  {
    id: 3,
    name: 'SSD Kingston NV3 1TB NVMe',
    description:
      'SSD NVMe PCIe 4.0 Kingston NV3 de 1TB, oferecendo altas velocidades de leitura e gravação.',
    price: 459.9,
    image: 'assets/images/ssd-kingston.png',
    category: 'Armazenamento',
    stock: 25,
    visible: true,
  },
  {
    id: 4,
    name: 'Notebook ASUS ROG Strix G16',
    description: 'Notebook Gamer ASUS ROG equipado com Intel Core i7, RTX 4060 e tela de 165Hz.',
    price: 8999.9,
    image: 'assets/images/asus-rog.png',
    category: 'Notebook',
    stock: 5,
    visible: true,
  },
  {
    id: 5,
    name: 'Monitor LG UltraGear 27"',
    description:
      'Monitor Gamer LG UltraGear de 27 polegadas, resolução QHD, painel IPS e taxa de atualização de 180Hz.',
    price: 1799.9,
    image: 'assets/images/lg-ultragear.png',
    category: 'Monitor',
    stock: 9,
    visible: true,
  },
  {
    id: 6,
    name: 'Mouse Logitech G Pro X Superlight 2',
    description:
      'Mouse gamer sem fio Logitech G Pro X Superlight 2 com sensor HERO de alta precisão e peso ultraleve.',
    price: 899.9,
    image: 'assets/images/logitech-gprox2.png',
    category: 'Mouse',
    stock: 18,
    visible: true,
  },
  {
    id: 7,
    name: 'Teclado HyperX Alloy Origins',
    description:
      'Teclado mecânico HyperX Alloy Origins RGB com switches HyperX Red e estrutura em alumínio.',
    price: 599.9,
    image: 'assets/images/hyperx-alloy.png',
    category: 'Teclado',
    stock: 20,
    visible: true,
  },
  {
    id: 8,
    name: 'Memória Kingston Fury Beast 32GB DDR5',
    description:
      'Kit de memória DDR5 Kingston Fury Beast 32GB (2x16GB) 6000MHz para alto desempenho.',
    price: 1099.9,
    image: 'assets/images/fury-beast.png',
    category: 'Memória RAM',
    stock: 15,
    visible: true,
  },
  {
    id: 9,
    name: 'Water Cooler Corsair H150 RGB',
    description: 'Water Cooler Corsair H150 RGB de 360mm compatível com processadores Intel e AMD.',
    price: 949.9,
    image: 'assets/images/corsair-h150.png',
    category: 'Refrigeração',
    stock: 10,
    visible: true,
  },
];
