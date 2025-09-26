import { Auction } from '../types/auction';

const STORAGE_KEY = 'rmc_auctions_v1';

export class AuctionsAPI {
  static list(query?: string): Auction[] {
    const auctions = this.getAll();
    if (!query) return auctions;
    
    const searchTerm = query.toLowerCase();
    return auctions.filter(auction => 
      auction.groupCode.toLowerCase().includes(searchTerm) ||
      auction.ticketValue.toString().includes(searchTerm) ||
      auction.monthNo.toString().includes(searchTerm) ||
      auction.status.toLowerCase().includes(searchTerm) ||
      (auction.winner && auction.winner.toLowerCase().includes(searchTerm))
    );
  }

  static get(id: string): Auction | undefined {
    const auctions = this.getAll();
    return auctions.find(auction => auction.id === id);
  }

  static create(data: Omit<Auction, 'id'>): Auction {
    const auction: Auction = {
      ...data,
      id: crypto.randomUUID()
    };
    
    const auctions = this.getAll();
    auctions.unshift(auction);
    this.saveAll(auctions);
    return auction;
  }

  static update(id: string, patch: Partial<Auction>): Auction | undefined {
    const auctions = this.getAll();
    const index = auctions.findIndex(auction => auction.id === id);
    
    if (index === -1) return undefined;
    
    auctions[index] = { ...auctions[index], ...patch };
    this.saveAll(auctions);
    return auctions[index];
  }

  static remove(id: string): void {
    const auctions = this.getAll();
    const filtered = auctions.filter(auction => auction.id !== id);
    this.saveAll(filtered);
  }

  static removeMany(ids: string[]): void {
    const auctions = this.getAll();
    const filtered = auctions.filter(auction => !ids.includes(auction.id));
    this.saveAll(filtered);
  }

  static seedIfEmpty(): void {
    const existing = this.getAll();
    if (existing.length > 0) return;

    const seedData: Omit<Auction, 'id'>[] = [
      {
        groupCode: 'RC-25-A',
        ticketValue: 100000,
        tenureMonths: 25,
        monthNo: 1,
        date: '2024-01-15',
        winner: 'SUB001',
        discount: 5000,
        status: 'Completed'
      },
      {
        groupCode: 'RC-25-A',
        ticketValue: 100000,
        tenureMonths: 25,
        monthNo: 2,
        date: '2024-02-15',
        winner: 'SUB045',
        discount: 4500,
        status: 'Completed'
      },
      {
        groupCode: 'RC-25-A',
        ticketValue: 100000,
        tenureMonths: 25,
        monthNo: 3,
        date: '2024-03-15',
        status: 'Scheduled'
      },
      {
        groupCode: 'RC-50-B',
        ticketValue: 200000,
        tenureMonths: 50,
        monthNo: 1,
        date: '2024-01-20',
        winner: 'SUB123',
        discount: 8000,
        status: 'Completed'
      },
      {
        groupCode: 'RC-50-B',
        ticketValue: 200000,
        tenureMonths: 50,
        monthNo: 2,
        date: '2024-02-20',
        status: 'Cancelled'
      },
      {
        groupCode: 'RC-30-C',
        ticketValue: 150000,
        tenureMonths: 30,
        monthNo: 1,
        date: '2024-03-01',
        status: 'Scheduled'
      }
    ];

    seedData.forEach(data => this.create(data));
  }

  static toCSV(rows: Auction[]): string {
    const headers = [
      'ID', 'Group Code', 'Ticket Value', 'Tenure Months', 'Month No', 
      'Date', 'Winner', 'Discount', 'Status'
    ];
    
    const csvRows = [
      headers.join(','),
      ...rows.map(row => [
        row.id,
        `"${row.groupCode}"`,
        row.ticketValue,
        row.tenureMonths,
        row.monthNo,
        row.date,
        row.winner ? `"${row.winner}"` : '',
        row.discount || '',
        `"${row.status}"`
      ].join(','))
    ];
    
    return csvRows.join('\n');
  }

  private static getAll(): Auction[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private static saveAll(auctions: Auction[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(auctions));
  }
}