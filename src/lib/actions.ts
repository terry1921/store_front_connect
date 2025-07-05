'use server';

import { suggestBlogTopics } from '@/ai/flows/suggest-blog-topics';
import { db } from '@/lib/firebase';
import type { Product } from '@/lib/types';
import { ArticleStatus } from '@/lib/types';
import { doc, runTransaction, setDoc, serverTimestamp, collection, getDocs, query, orderBy, limit, type QueryConstraint, Timestamp } from 'firebase/firestore';

export async function getBlogTopicSuggestions(storeFocus: string): Promise<{topics?: string[]; error?: string}> {
  try {
    // The AI flow returns an object with a 'topics' property which is an array of strings.
    const result = await suggestBlogTopics({ storeFocus });
    if (result && result.topics) {
      return { topics: result.topics };
    }
    return { error: 'The AI returned an unexpected response format.'}
  } catch (e) {
    console.error(e);
    // Provide a user-friendly error message.
    return { error: 'Failed to generate topic suggestions due to an internal error. Please try again later.' };
  }
}

async function getNextProductId(): Promise<number> {
  const counterRef = doc(db, 'counters', 'products');
  try {
      const newId = await runTransaction(db, async (transaction) => {
          const counterDoc = await transaction.get(counterRef);
          if (!counterDoc.exists()) {
              transaction.set(counterRef, { currentId: 1 });
              return 1;
          }
          const newId = counterDoc.data().currentId + 1;
          transaction.update(counterRef, { currentId: newId });
          return newId;
      });
      return newId;
  } catch (e) {
      console.error("Transaction failed: ", e);
      throw new Error("Could not generate a new product ID.");
  }
}

export async function addProduct(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<{ success: boolean; error?: string }> {
  try {
      const productId = await getNextProductId();
      const productRef = doc(db, 'products', productId.toString());

      await setDoc(productRef, {
          ...productData,
          id: productId,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
      });
      
      return { success: true };
  } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      return { success: false, error: `Failed to add product: ${errorMessage}` };
  }
}

export async function getProducts(limitCount?: number): Promise<Product[]> {
    try {
        const productsRef = collection(db, 'products');
        
        const queryConstraints: QueryConstraint[] = [orderBy('createdAt', 'desc')];
        if (limitCount) {
            queryConstraints.push(limit(limitCount));
        }
        
        const q = query(productsRef, ...queryConstraints);
        const querySnapshot = await getDocs(q);
        
        const products: Product[] = [];
        querySnapshot.forEach((doc) => {
            products.push(doc.data() as Product);
        });
        
        return products;
    } catch (e) {
        console.error("Failed to fetch products: ", e);
        return [];
    }
}

export async function addArticle(articleData: {
    title: string;
    author: string;
    date: Date;
    shortDescription: string;
    link: string;
  }): Promise<{ success: boolean; error?: string }> {
    try {
      const articleRef = doc(collection(db, 'articles'));
  
      const dataToSave = {
        ...articleData,
        id: articleRef.id,
        date: Timestamp.fromDate(articleData.date),
        status: ArticleStatus.Review,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      
      await setDoc(articleRef, dataToSave);
  
      return { success: true };
    } catch (e) {
        console.error(e);
        const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
        return { success: false, error: `Failed to submit article: ${errorMessage}` };
    }
  }
