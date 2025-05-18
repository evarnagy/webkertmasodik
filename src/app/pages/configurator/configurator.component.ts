import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProcessorService } from '../../shared/services/processor.service';

export interface BaseComponent {
  id?: string;
  name: string;
  price: number;
}

export interface Processor extends BaseComponent {
  id: string;
  cores: number;
  speed: number;
}

export interface Motherboard extends BaseComponent {
  chipset: string;
}

export interface Ram extends BaseComponent {
  capacity: number;
  speed: number;
}

export interface Gpu extends BaseComponent {
  memory: number;
}

@Component({
  selector: 'app-configurator',
  standalone: true,
  templateUrl: './configurator.component.html',
  styleUrls: ['./configurator.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class ConfiguratorComponent implements OnInit, AfterViewInit, OnDestroy {

  processors: Processor[] = [];
  filteredProcessors: Processor[] = [];
  topCheapProcessors: Processor[] = [];
  fastestProcessors: Processor[] = [];
  highCoreProcessors: Processor[] = [];
  motherboards: Motherboard[] = [
    { id: '1', name: 'ASUS ROG', price: 250, chipset: 'Z490' },
    { id: '2', name: 'MSI MAG', price: 200, chipset: 'B550' }
  ];
  rams: Ram[] = [
    { id: '1', name: 'Corsair Vengeance', price: 100, capacity: 16, speed: 3200 },
    { id: '2', name: 'G.SKILL Ripjaws', price: 90, capacity: 16, speed: 3000 }
  ];
  gpus: Gpu[] = [
    { id: '1', name: 'NVIDIA RTX 3080', price: 800, memory: 10 },
    { id: '2', name: 'AMD Radeon RX 6800', price: 750, memory: 16 }
  ];

  selectedProcessor: Processor | null = null;
  selectedMotherboard: Motherboard | null = null;
  selectedRam: Ram | null = null;
  selectedGpu: Gpu | null = null;

  totalPrice: number = 0;
  editProcessor: Processor = this.getEmptyProcessor();

  private intervalId: any;

  constructor(private processorService: ProcessorService) {}

 ngOnInit(): void {
  if (!this.processorService) {
    console.error('ProcessorService is undefined!');
    return;
  }

  this.processorService.getProcessors().subscribe({
    next: data => {
      console.log('Processors loaded:', data);
      this.processors = data;
    },
    error: err => {
      console.error('Error loading processors:', err);
    }
    
  });
  
}


  ngAfterViewInit(): void {
    this.intervalId = setInterval(() => {
      console.log('Aktuális összár:', this.totalPrice, 'USD');
    }, 5000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  selectComponent(type: string, component: BaseComponent) {
    switch (type) {
      case 'processor':
        this.selectedProcessor = component as Processor;
        break;
      case 'motherboard':
        this.selectedMotherboard = component as Motherboard;
        break;
      case 'ram':
        this.selectedRam = component as Ram;
        break;
      case 'gpu':
        this.selectedGpu = component as Gpu;
        break;
    }
    this.calculateTotalPrice();
  }

  calculateTotalPrice() {
    this.totalPrice =
      (this.selectedProcessor?.price || 0) +
      (this.selectedMotherboard?.price || 0) +
      (this.selectedRam?.price || 0) +
      (this.selectedGpu?.price || 0);
  }

  saveConfiguration() {
    console.log('Configuration Saved:', {
      processor: this.selectedProcessor,
      motherboard: this.selectedMotherboard,
      ram: this.selectedRam,
      gpu: this.selectedGpu,
      totalPrice: this.totalPrice
    });
  }

  addProcessor() {
    const { id, ...processorData } = this.editProcessor;
    this.processorService.addProcessor(processorData).then(() => {
      this.editProcessor = this.getEmptyProcessor();
    });
  }
  editProcessorByCopy(processor: any): void {
  this.editProcessor = { ...processor };
}


  updateProcessor() {
    if (typeof this.editProcessor.id === 'string') {
      const { id, ...data } = this.editProcessor;
      this.processorService.updateProcessor(id, data).then(() => {
        this.editProcessor = this.getEmptyProcessor();
      });
    }
  }

  deleteProcessor(id: string) {
    this.processorService.deleteProcessor(id);
  }

  cancelEdit() {
    this.editProcessor = this.getEmptyProcessor();
  }

  private getEmptyProcessor(): Processor {
    return { id: '', name: '', price: 0, cores: 0, speed: 0 };
  }
}
