import { useAuth } from "@/src/lib/AuthProvider";
import { supabase } from "@/src/lib/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAdminOrderList = ({ archived = false }) => {
  const statuses = archived ? ["Delivered"] : ["New", "Cooking", "Delivering"];



  return useQuery({
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .in("status", statuses)
        .order("created_at", { ascending: false });
      if (error) throw new Error(error.message);

      return data;
    },
    queryKey: ["orders", archived],
  });
};

export const useMyOrderList = () => {
  const { session } = useAuth();

  const id = session?.user.id;

  //if (!id) return null;

  return useQuery({
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", id)
        .order("created_at", { ascending: false });
      if (error) throw new Error(error.message);

      return data;
    },
    queryKey: ["orders", id],
  });
};

export const useOrderDetails = (id: Number) => {
  return useQuery({
    queryKey: ["orders", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*, order_items(*, products(*))")
        .eq("id", id)
        .single();

      if (error) throw new Error(error.message);

      return data;
    },
  });
};

export const useInsertOrder = () => {
  const queryClient = useQueryClient();

  const { session } = useAuth();

  const userId = session?.user.id;

  return useMutation({
    async mutationFn(data: any) {
      const { error, data: newProduct } = await supabase
        .from("orders")
        .insert({ ...data, user_id: userId })
        .select()
        .single();

      if (error) throw new Error(error.message);

      return newProduct;
    },

    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({ id, status }: { id: number; status: string }) {
      const { error, data: updatedOrder } = await supabase
        .from("orders")
        .update({
          status: status,
        })
        .eq("id", id)
        .select()
        .single();

      if (error) throw new Error(error.message);

      return updatedOrder;
    },

    async onSuccess(_, data) {
      await queryClient.invalidateQueries({ queryKey: ["orders"] });
      await queryClient.invalidateQueries({ queryKey: ["orders", data.id] });
    },
  });
};
