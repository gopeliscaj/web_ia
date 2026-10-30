import { useEffect, useState, type FormEvent } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Loader2,
  Check,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { supabase } from '@/lib/supabase';
import { formatPrice, type OrderPayload } from '@/types';

type Stage = 'cart' | 'checkout' | 'success' | 'error';
type FormState = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  notes: string;
};

const SHIPPING = 15;

export default function CartDrawer() {
  const { items, isOpen, close, remove, setQty, subtotal, count, clear } = useCart();
  const [stage, setStage] = useState<Stage>('cart');
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => setStage('cart'), 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const update = (k: keyof FormState, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = 'Ingresa tu nombre.';
    if (!form.email.trim()) next.email = 'Necesitamos tu correo.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Correo no válido.';
    if (!form.address.trim()) next.address = 'Ingresa tu dirección de envío.';
    if (!form.city.trim()) next.city = 'Ingresa tu ciudad.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const placeOrder = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    const payload: OrderPayload = {
      customer_name: form.name.trim(),
      customer_email: form.email.trim(),
      customer_phone: form.phone.trim() || null,
      shipping_address: form.address.trim(),
      city: form.city.trim(),
      notes: form.notes.trim() || null,
      items,
      total: subtotal + SHIPPING,
    };
    try {
      const { error } = await supabase.from('orders').insert({
        customer_name: payload.customer_name,
        customer_email: payload.customer_email,
        customer_phone: payload.customer_phone,
        shipping_address: payload.shipping_address,
        city: payload.city,
        notes: payload.notes,
        items: payload.items,
        total: payload.total,
      });
      if (error) throw error;
      setStage('success');
      clear();
    } catch {
      setStage('error');
    } finally {
      setSubmitting(false);
    }
  };

  const total = subtotal + (items.length > 0 ? SHIPPING : 0);

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] bg-tinta-950/50 backdrop-blur-sm transition-opacity duration-400 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={close}
        aria-hidden="true"
      />

      <aside
        className={`fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-crema-50 shadow-lift transition-transform duration-500 ease-spring ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-crema-200 bg-crema-50 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-barro-700/10 text-barro-700">
              <ShoppingBag className="h-5 w-5" />
            </span>
            <div>
              <h2 className="font-display text-lg font-medium leading-none text-tinta-900">
                {stage === 'checkout' ? 'Finalizar compra' : 'Tu carrito'}
              </h2>
              {count > 0 && stage !== 'checkout' && (
                <p className="mt-1 text-xs text-tinta-600">
                  {count} {count === 1 ? 'artículo' : 'artículos'}
                </p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={close}
            className="flex h-9 w-9 items-center justify-center rounded-full text-tinta-700 transition-colors hover:bg-crema-100"
            aria-label="Cerrar carrito"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-5">
          {stage === 'success' ? (
            <SuccessView onClose={close} />
          ) : stage === 'error' ? (
            <ErrorView onBack={() => setStage('checkout')} />
          ) : items.length === 0 ? (
            <EmptyView onClose={close} />
          ) : stage === 'checkout' ? (
            <CheckoutForm
              form={form}
              errors={errors}
              update={update}
              onBack={() => setStage('cart')}
            />
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map((item) => (
                <li key={item.productId} className="group flex gap-4 rounded-3xl border border-crema-200 bg-white p-3 transition-all duration-300 hover:shadow-soft">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="h-24 w-20 shrink-0 rounded-2xl object-cover"
                    loading="lazy"
                  />
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-display text-base font-medium leading-snug text-tinta-900">
                        {item.name}
                      </h3>
                      <button
                        type="button"
                        onClick={() => remove(item.productId)}
                        className="text-barro-300 transition-colors hover:text-barro-700"
                        aria-label={`Eliminar ${item.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="mt-1 text-sm text-barro-600">{formatPrice(item.price)}</p>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center rounded-full border border-crema-300 bg-crema-50">
                        <button
                          type="button"
                          onClick={() => setQty(item.productId, item.qty - 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-full text-tinta-800 transition-colors hover:bg-crema-200 active:scale-90"
                          aria-label="Quitar uno"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold">{item.qty}</span>
                        <button
                          type="button"
                          onClick={() => setQty(item.productId, item.qty + 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-full text-tinta-800 transition-colors hover:bg-crema-200 active:scale-90"
                          aria-label="Añadir uno"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="font-medium text-tinta-900">
                        {formatPrice(item.price * item.qty)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (stage === 'cart' || stage === 'checkout') && (
          <form onSubmit={placeOrder} className="border-t border-crema-200 bg-crema-50 px-5 py-5">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-tinta-700">
                <span>Subtotal</span>
                <span className="font-medium text-tinta-900">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-tinta-700">
                <span>Envío</span>
                <span className="font-medium text-tinta-900">{formatPrice(SHIPPING)}</span>
              </div>
              <div className="flex justify-between border-t border-crema-200 pt-2 font-display text-lg font-semibold text-tinta-900">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            {stage === 'cart' ? (
              <button
                type="button"
                onClick={() => setStage('checkout')}
                className="btn-primary mt-4 w-full"
              >
                Realizar pedido
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <div className="mt-4 flex flex-col gap-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Procesando…
                    </>
                  ) : (
                    'Confirmar pedido'
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setStage('cart')}
                  className="flex items-center justify-center gap-1.5 py-2 text-sm font-medium text-barro-600 transition-colors hover:text-barro-700"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Volver al carrito
                </button>
              </div>
            )}
            <p className="mt-3 text-center text-xs text-tinta-600">
              Pago contra entrega en Cajamarca · Transferencia a todo Perú
            </p>
          </form>
        )}
      </aside>
    </>
  );
}

function EmptyView({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-5 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-crema-100 text-barro-300">
        <ShoppingBag className="h-9 w-9" />
      </div>
      <div>
        <p className="font-display text-xl text-tinta-900">Tu carrito está vacío</p>
        <p className="mt-2 max-w-xs text-sm text-tinta-600">
          Explora el catálogo y añade las piezas que más te gusten.
        </p>
      </div>
      <button type="button" onClick={onClose} className="btn-primary mt-1">
        Ver productos
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function SuccessView({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 px-6 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-andino-400/20 text-andino-600">
        <Check className="h-10 w-10" strokeWidth={2.5} />
      </div>
      <div>
        <p className="font-display text-2xl text-tinta-900">¡Pedido confirmado!</p>
        <p className="mt-2 max-w-xs text-sm text-tinta-600">
          Gracias por apoyar la artesanía de Cajamarca. Te contactaremos por correo para
          coordinar el pago y el envío.
        </p>
      </div>
      <button type="button" onClick={onClose} className="btn-primary">
        Seguir comprando
      </button>
    </div>
  );
}

function ErrorView({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 px-6 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-red-600">
        <AlertCircle className="h-10 w-10" />
      </div>
      <div>
        <p className="font-display text-2xl text-tinta-900">No se pudo registrar</p>
        <p className="mt-2 max-w-xs text-sm text-tinta-600">
          Ocurrió un error al procesar tu pedido. Inténtalo de nuevo en un momento.
        </p>
      </div>
      <button type="button" onClick={onBack} className="btn-primary">
        Reintentar
      </button>
    </div>
  );
}

function CheckoutForm({
  form,
  errors,
  update,
  onBack,
}: {
  form: FormState;
  errors: Partial<Record<keyof FormState, string>>;
  update: (k: keyof FormState, v: string) => void;
  onBack: () => void;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="mb-5 flex items-center gap-1.5 text-sm font-medium text-barro-600 transition-colors hover:text-barro-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver al carrito
      </button>
      <div className="space-y-4">
        <CField label="Nombre completo" error={errors.name}>
          <input
            type="text"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="Tu nombre"
            className="caja-input"
            autoComplete="name"
          />
        </CField>
        <CField label="Correo" error={errors.email}>
          <input
            type="email"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder="tu@correo.com"
            className="caja-input"
            autoComplete="email"
          />
        </CField>
        <CField label="Teléfono">
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
            placeholder="Opcional"
            className="caja-input"
            autoComplete="tel"
          />
        </CField>
        <CField label="Dirección de envío" error={errors.address}>
          <input
            type="text"
            value={form.address}
            onChange={(e) => update('address', e.target.value)}
            placeholder="Calle, número, referencia"
            className="caja-input"
            autoComplete="street-address"
          />
        </CField>
        <CField label="Ciudad" error={errors.city}>
          <input
            type="text"
            value={form.city}
            onChange={(e) => update('city', e.target.value)}
            placeholder="Ej. Lima, Cajamarca…"
            className="caja-input"
          />
        </CField>
        <CField label="Notas">
          <textarea
            value={form.notes}
            onChange={(e) => update('notes', e.target.value)}
            placeholder="Instrucciones de entrega (opcional)"
            rows={3}
            className="caja-input resize-none"
          />
        </CField>
      </div>
      <style>{`
        .caja-input {
          width: 100%;
          border-radius: 0.85rem;
          background: #FFFFFF;
          border: 1px solid #ECDFC6;
          padding: 0.7rem 0.95rem;
          font-size: 0.95rem;
          color: #15110D;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .caja-input::placeholder { color: #C2825A; opacity: 0.7; }
        .caja-input:focus {
          outline: none;
          border-color: #8A4F26;
          box-shadow: 0 0 0 3px rgba(138,79,38,0.15);
        }
      `}</style>
    </div>
  );
}

function CField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-tinta-800">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  );
}
